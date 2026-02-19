// onboarding services
// handles onboarding data submission

import { OnboardingDraft, OnboardingSubmitResponse } from "../../../types";
import { client } from "./client";
import { API_ENDPOINTS } from "./config";

/**
 * Submit onboarding draft
 */
const submitOnboarding = async (
  draft: OnboardingDraft,
): Promise<OnboardingSubmitResponse> => {
  const response = await client.post<OnboardingSubmitResponse>(
    API_ENDPOINTS.ONBOARDING_SUBMIT,
    { draft },
  );
  return response.data;
};

export { submitOnboarding };
