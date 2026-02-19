import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitOnboarding } from "../services/onboarding.api";
import { useOnboardingStore } from "../../store/onboardingStore";
import { OnboardingDraft } from "../../../types";
import { QUERY_KEYS } from "../services";

/**
 * Hook for submitting onboarding draft
 */
export const useSubmitOnboarding = () => {
  const queryClient = useQueryClient();
  const { clearDraft } = useOnboardingStore();

  const { mutate, isPending, error, data } = useMutation({
    mutationFn: (draft: OnboardingDraft) => submitOnboarding(draft),
    onSuccess: () => {
      // Clear draft on successful submission
      clearDraft();

      // invalidate the verification status so it should change to in progress
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.VERIFICATION_STATUS,
      });
    },
  });

  return {
    submitOnboarding: mutate,
    isPending,
    error,
    data,
  };
};
