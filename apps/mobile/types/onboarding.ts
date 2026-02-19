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

export interface OnboardingSubmitRequest {
  draft: OnboardingDraft;
}

export interface OnboardingSubmitResponse {
  submissionId: string;
  status: "RECEIVED";
}
