import { User } from "./user";

export interface Session {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  userId: string;
  tokenType?: "access" | "refresh";
}

export interface SessionResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  session: SessionResponse;
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface RefreshResponse {
  session: SessionResponse;
}
