// login with email and password

import { store } from "../store";
import { RefreshResponse, Session } from "../types";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const ACCESS_TOKEN_TTL = 15 * 60 * 1000; // 15 minutes
const REFRESH_TOKEN_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

const login = async (email: string, password: string) => {
  // find user by email
  const user = store.getUserByEmail(email);

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // verify password
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // generate tokens
  const accessToken = `access_${uuidv4()}`;
  const refreshToken = `refresh_${uuidv4()}`;

  // calculate expiry time
  const accessExpiresAt = new Date(Date.now() + ACCESS_TOKEN_TTL).toISOString();
  const refreshExpiresAt = new Date(
    Date.now() + REFRESH_TOKEN_TTL,
  ).toISOString();

  const session: Session = {
    accessToken,
    refreshToken,
    expiresAt: accessExpiresAt,
    userId: user.id,
  };

  // store both tokens in the session store
  store.saveSession(accessToken, {
    ...session,
    tokenType: "access",
    expiresAt: accessExpiresAt,
  });

  store.saveSession(refreshToken, {
    ...session,
    tokenType: "refresh",
    expiresAt: refreshExpiresAt,
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    },
    accessToken,
    refreshToken,
    expiresAt: accessExpiresAt,
  };
};

// refresh access token using refresh token
const refresh = async (refreshToken: string): Promise<RefreshResponse> => {
  // look up up refresh token in store
  const tokenData = store.getSession(refreshToken);

  if (!tokenData) {
    throw new Error("INVALID_REFRESH_TOKEN");
  }

  // check if refresh token is expired
  if (new Date(tokenData.expiresAt) < new Date()) {
    store.deleteSession(refreshToken);
    throw new Error("REFRESH_TOKEN_EXPIRED");
  }

  // get user
  const user = store.getUserById(tokenData.userId);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  // generate new access token keep same refresh token
  const newAccessToken = `access_${uuidv4()}`;
  const accessExpiresAt = new Date(Date.now() + ACCESS_TOKEN_TTL).toISOString();

  // store new access token
  store.saveSession(newAccessToken, {
    accessToken: newAccessToken,
    refreshToken,
    userId: user.id,
    tokenType: "access",
    expiresAt: accessExpiresAt,
  });

  return {
    session: {
      accessToken: newAccessToken,
      refreshToken, // same refresh token
      expiresAt: accessExpiresAt,
    },
  };
};

// get user profile by ID
const getProfile = async (userId: string) => {
  //get user from store
  const user = store.getUserById(userId);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  // return user profile
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
  };
};

export const authService = {
  login,
  refresh,
  getProfile,
};
