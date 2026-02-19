export type ErrorCode =
  | "VALIDATION_ERROR"
  | "INVALID_CREDENTIALS"
  | "TOKEN_EXPIRED"
  | "UNAUTHORIZED"
  | "INTERNAL_ERROR";

export interface ErrorResponse {
  error: {
    code: ErrorCode;
    message: string;
    details?: Record<string, any>;
  };
}
