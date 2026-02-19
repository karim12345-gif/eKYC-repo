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

export interface VerificationStatusResponse {
  status: VerificationStatus;
  updatedAt: string;
  details: {
    reasons: string[];
  };
}
