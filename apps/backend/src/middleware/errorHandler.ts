// centralized error handling middleware
// ensures consistent error responses accross all endpoints

import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../types";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const requestId = (req as unknown as AuthenticatedRequest).id || "unknown";

  // log error ( but dont log sensitive data)
  console.log({
    requestId,
    error: err.message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    timeStamp: new Date().toISOString(),
  });

  // handle zod validation errors
  if (err instanceof ZodError) {
    res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Validation failed",
        details: {
          fieldErrors: err.flatten().fieldErrors,
        },
      },
    });
    return;
  }

  // handle custome errros

  if (err.message === "INVALID_CREDENTIALS") {
    res.status(401).json({
      error: {
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password",
      },
    });
    return;
  }

  if (err.message === "INVALID_REFRESH_TOKEN") {
    res.status(401).json({
      error: {
        code: "INVALID_REFRESH_TOKEN",
        message: "Invalid refresh token",
      },
    });
    return;
  }

  if (err.message === "REFRESH_TOKEN_EXPIRED") {
    res.status(401).json({
      error: {
        code: "REFRESH_TOKEN_EXPIRED",
        message: "Refresh token has expired",
      },
    });
    return;
  }

  if (err.message === "TERMS_NOT_ACCEPTED") {
    res.status(400).json({
      error: {
        code: "TERMS_NOT_ACCEPTED",
        message: "You must accept the terms and conditions",
      },
    });
    return;
  }

  if (err.message === "VERIFICATION_NOT_IN_PROGRESS") {
    res.status(400).json({
      error: {
        code: "VERIFICATION_NOT_IN_PROGRESS",
        message: "Verification not in progress, please submit onbaording first",
      },
    });
    return;
  }

  if (err.message === "UNAUTHORIZED") {
    res.status(401).json({
      error: {
        code: "UNAUTHORIZED",
        message: "Authentication required",
      },
    });
    return;
  }

  // default internal server error
  res.status(500).json({
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred",
    },
  });
};
