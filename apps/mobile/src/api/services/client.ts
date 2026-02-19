import axios from "axios";
import { API_CONFIG, API_ENDPOINTS } from "./config";
import { Session, User } from "../../../types";

/**
 * Axios Client
 *
 * This file does NOT import authStore to avoid circular dependency
 * Instead, it uses a token manager that authStore will initialize
 */

/**
 * Token Manager
 * This is initialized by authStore to avoid circular dependency
 */
let tokenManager: {
  getSession: () => { user: User | null; session: Session | null } | null;
  setSession: (user: User, session: Session) => void;
  clearSession: () => void;
} | null = null;

export const initializeTokenManager = (manager: typeof tokenManager) => {
  tokenManager = manager;
};

// Create axios instance
const client = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: Add auth token to every request
client.interceptors.request.use(
  (config) => {
    const sessionData = tokenManager?.getSession();
    if (sessionData?.session?.accessToken) {
      config.headers.Authorization = `Bearer ${sessionData.session.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor: Handle 401 errors with refresh-retry logic
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is not 401, request already retried, or it's a refresh request, reject immediately
    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      originalRequest.url?.includes(API_ENDPOINTS.AUTH_REFRESH)
    ) {
      return Promise.reject(error);
    }

    // If already refreshing, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => {
          return client(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Get refresh token from token manager
      const sessionData = tokenManager?.getSession();
      if (!sessionData?.session?.refreshToken) {
        throw new Error("No refresh token available");
      }

      // Call refresh endpoint directly (no circular dependency)
      const response = await client.post(API_ENDPOINTS.AUTH_REFRESH, {
        refreshToken: sessionData.session.refreshToken,
      });

      // Update session via token manager
      if (sessionData.user && tokenManager) {
        tokenManager.setSession(sessionData.user, response.data.session);
      }

      isRefreshing = false;
      processQueue();

      // Retry the original request with new token
      return client(originalRequest);
    } catch (refreshError) {
      isRefreshing = false;
      processQueue(refreshError);

      // Refresh failed, clear session
      tokenManager?.clearSession();
      return Promise.reject(refreshError);
    }
  },
);

export { client };
