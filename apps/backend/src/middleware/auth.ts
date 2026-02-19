import { NextFunction, Request, RequestHandler, Response } from "express";
import { store } from "../store";
import { AuthenticatedRequest } from "../types";

// does authoriztion header exist and start with bearer  if not -> 401
// extract token from header
// is the token expired , compare expiresAT to now, if expired -> 401
// does the userId match a real user in the store, if not -> 401

// middelware to authenticate requests using bearer tokens
// token are simple UUID stored in an in-memory store

export const authMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  // check if authorization header exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      error: {
        code: "UNAUTHORIZED",
        message: "Missing or invalid authorization header",
      },
    });
    return;
  }

  // Extract token from header
  const token = authHeader.substring(7);

  // look up the token in the store
  const tokenData = store.getSession(token);

  if (!tokenData) {
    res.status(401).json({
      error: {
        code: "UNAUTHORIZED",
        message: "Invalid or expired token",
      },
    });
    return;
  }

  // check if token is expired
  if (new Date(tokenData.expiresAt) < new Date()) {
    // clean up expired token
    store.deleteSession(token);
    res.status(401).json({
      error: {
        code: "Token_EXPIRED",
        message: "Access token has expired",
      },
    });
    return;
  }

  // get user from store
  const user = store.getUserById(tokenData.userId);

  if (!user) {
    res.status(401).json({
      error: {
        code: "UNAUTHORIZED",
        message: "User not found",
      },
    });
    return;
  }

  // attach user info to request
  (req as unknown as AuthenticatedRequest).user = {
    userId: user.id,
    email: user.email,
  };

  next();
};
