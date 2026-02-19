export interface User {
  id: string;
  email: string;
  fullName: string;
  passwordHash: string;
}

export interface Session {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  userId: string;
  tokenType?: "access" | "refresh"; // for internal tracking
}

export interface OnboardingDraft {
  profile: {
    fullName: string;
    dateOfBirth: string;
    nationality: string;
  };
  document: {
    documentType: "PASSPORT" | "ID_CARD" | "DRIVERS_LICENSE";
    documentNumber: string;
  };
  address: {
    addressLine1: string;
    city: string;
    country: string;
  };
  consents: {
    termsAccepted: boolean;
  };
}

export type VerificationStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "APPROVED"
  | "REJECTED"
  | "MANUAL_REVIEW";

export interface VerificationRecord {
  status: VerificationStatus;
  updatedAt: string;
  details: {
    reasons: string[];
  };
}

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
  user: Omit<User, "passwordHash">;
  session: SessionResponse;
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface RefreshResponse {
  session: SessionResponse;
}

export interface OnboardingSubmitRequest {
  draft: OnboardingDraft;
}

export interface OnboardingSubmitResponse {
  submissionId: string;
  status: "RECEIVED";
}

export interface VerificationStatusResponse {
  status: VerificationStatus;
  updatedAt: string;
  details: {
    reasons: string[];
  };
}

// express request extensions
export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
  id?: string; // request ID
}
