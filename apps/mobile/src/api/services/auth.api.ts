// auth services
// all authentication related api calls

import { LoginResponse, RefreshResponse, User } from "../../../types";
import { client } from "./client";
import { API_ENDPOINTS } from "./config";

// login

const login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await client.post<LoginResponse>(API_ENDPOINTS.AUTH_LOGIN, {
    email,
    password,
  });
  return response.data;
};

const refresh = async (refreshToken: string): Promise<RefreshResponse> => {
  const response = await client.post<RefreshResponse>(
    API_ENDPOINTS.AUTH_REFRESH,
    {
      refreshToken,
    },
  );
  return response.data;
};

// get current authenticated user

const getMe = async (): Promise<User> => {
  const response = await client.get<User>(API_ENDPOINTS.AUTH_ME);
  return response.data;
};

export { login, refresh, getMe };
