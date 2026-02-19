// authentication status enum
// represent the current state of the user authentication
export enum AuthStatus {
  LOGGED_OUT = "LOGGED_OUT",
  LOGGING_IN = "LOGGING_IN",
  LOGGED_IN = "LOGGED_IN",
  REFRESHING = "REFRESHING",
  EXPIRED = "EXPIRED",
  IN_PROGRESS = "IN_PROGRESS",
}

// onboarding submission status enum
// represent the current state of the onboarding submission
export enum OnboardingSubmissionStatus {
  IDLE = "IDLE",
  SUBMITTING = "SUBMITTING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}
