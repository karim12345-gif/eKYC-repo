import morgan from "morgan";
import { Request } from "express";

// custome morgan token to redacct sensitive data from logs

morgan.token("sanitized-body", (req) => {
  const request = req as Request;
  if (!request.body) return "-";

  const sanitized = { ...request.body };

  //redact sensitve fileds
  if (sanitized.password) sanitized.password = "[REDACTED]";
  if (sanitized.refreshToken) sanitized.refreshToken = "[REDACTED]";
  if (sanitized.accessToken) sanitized.accessToken = "[REDACTED]";

  // Rdact PII from onboarding drafts
  if (sanitized.draft) {
    if (sanitized.draft.profile?.dateOfBirth) {
      sanitized.draft.profile.dateOfBirth = "[REDACTED]";
    }
    if (sanitized.draft.profile?.documentNumber) {
      sanitized.draft.profile.documentNumber = "[REDACTED]";
    }

    if (sanitized.draft.profile?.address) {
      sanitized.draft.profile.address = "[REDACTED]";
    }
  }

  return JSON.stringify(sanitized);
});

// custom morgan token to redact authorization headers

morgan.token("sanitized-auth", (req) => {
  const request = req as Request;
  const auth = request.headers.authorization;
  if (!auth) return "-";

  if (auth.startsWith("Bearer ")) return "Bearer [REDACTED]";

  return "[REDACTED]";
});

// morgan logger configuration

export const logger = morgan(
  ":method :url :status :res[content-length] - :response-time ms :sanitized-auth :sanitized-body",
  {
    skip: (req) => {
      // skip the logging health check endpoints
      return req.url === "/health" || req.url === "/";
    },
  },
);
