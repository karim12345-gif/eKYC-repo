import express from "express";
import dotenv from "dotenv";
import { errorHandler, logger, requestIdMiddleware } from "./middleware";
import helmet from "helmet";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import meRoutes from "./routes/me.routes";
import onboardingRoutes from "./routes/onboarding.routes";
import verificationRoutes from "./routes/verification.routes";

// load environment variables
dotenv.config();

const app = express();

// middleware
app.use(helmet());

// CORS
// allow requests from anywhere.
// In production you'd lock this down to your app's domain only
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  }),
);

// BODY pasring
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// request ID
app.use(requestIdMiddleware);

// HTTP loggin
app.use(logger);

// ROUTES
app.get("/health", (_req: express.Request, res: express.Response) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// API ROUTES
app.use("/v1/auth", authRoutes);
app.use("/v1/me", meRoutes);
app.use("/v1/onboarding", onboardingRoutes);
app.use("/v1/verification", verificationRoutes);

// 404 handler
app.use((_req: express.Request, res: express.Response) => {
  res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "Endpoint not found",
    },
  });
});

// error handler
app.use(errorHandler);

export default app;
