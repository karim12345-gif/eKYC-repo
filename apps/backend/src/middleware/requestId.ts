// Middelware to generate and attach a unique request ID to each request
import { AuthenticatedRequest } from "../types";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const requestIdMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const requestId = uuidv4();
  (req as unknown as AuthenticatedRequest).id = requestId;
  res.setHeader("X-Request-ID", requestId);
  next();
};
