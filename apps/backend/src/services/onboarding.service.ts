import { store } from "../store";
import { OnboardingDraft, OnboardingSubmitResponse } from "../types";

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
