import { store } from "../store";
import { OnboardingDraft, OnboardingSubmitResponse } from "../types";
import { verificationService } from "./verification.service";

const submitOnboarding = async (
  userId: string,
  draft: OnboardingDraft,
): Promise<OnboardingSubmitResponse> => {
  // additional valiation
  if (!draft.consents.termsAccepted) {
    throw new Error("TERMS_NOT_ACCEPTED");
  }

  // generate submission id
  const submissionId = `SUB-${Date.now()}-${userId}`;

  // save onbpoaridng draft
  store.saveOnboardingDraft(userId, draft);

  // update verification status to IN_PROGRESS
  store.updateVerificationStatus(userId, {
    status: "IN_PROGRESS",
    updatedAt: new Date().toISOString(),
    details: {
      reasons: [],
    },
  });

  // Automatically start verification process (simulation)
  verificationService.processVerification(userId).catch((err) => {
    console.error(
      `Failed to start verification process for user ${userId}`,
      err,
    );
  });

  console.log(
    `onboarding submitted for user ${userId} with submission id ${submissionId}`,
  );

  return {
    submissionId,
    status: "RECEIVED",
  };
};

export const onboardingService = {
  submitOnboarding,
};
