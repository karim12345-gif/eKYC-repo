/* eslint-disable @typescript-eslint/naming-convention */

// Base configuration
const BASE_URL = "http://localhost:3000";
const API_VERSION = "v1";

// Resource paths
const AUTH_RESOURCE = "/auth";
const ONBOARDING_RESOURCE = "/onboarding";
const VERIFICATION_RESOURCE = "/verification";

/**
 * API Endpoints Configuration
 * All backend endpoints in one place for easy maintenance
 */
const API_ENDPOINTS = {
  // Auth endpoints
  AUTH_LOGIN: `${BASE_URL}/${API_VERSION}${AUTH_RESOURCE}/login`,
  AUTH_REFRESH: `${BASE_URL}/${API_VERSION}${AUTH_RESOURCE}/refresh`,
  AUTH_ME: `${BASE_URL}/${API_VERSION}/me`,

  // Onboarding endpoints
  ONBOARDING_SUBMIT: `${BASE_URL}/${API_VERSION}${ONBOARDING_RESOURCE}/submit`,

  // Verification endpoints
  VERIFICATION_STATUS: `${BASE_URL}/${API_VERSION}${VERIFICATION_RESOURCE}/status`,
  VERIFICATION_PROCESS: `${BASE_URL}/${API_VERSION}${VERIFICATION_RESOURCE}/process`,
  VERIFICATION_RESET: `${BASE_URL}/${API_VERSION}${VERIFICATION_RESOURCE}/reset`,
} as const;

/**
 * React Query cache keys
 * Used for cache invalidation and refetching
 */
const QUERY_KEYS = {
  ME: ["me"] as const,
  VERIFICATION_STATUS: ["verification", "status"] as const,
} as const;

/**
 * API Configuration
 */
const API_CONFIG = {
  BASE_URL,
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 1,
  STALE_TIME: 30000, // 30 seconds
} as const;

export { API_ENDPOINTS, QUERY_KEYS, API_CONFIG };
