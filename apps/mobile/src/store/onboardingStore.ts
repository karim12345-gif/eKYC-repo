import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { submitOnboarding } from "../api/services/onboarding.api";
import { OnboardingDraft, OnboardingSubmissionStatus } from "../../types";

/**
 * Onboarding Store
 * Manages onboarding progress, draft data, and persistence
 */

interface OnboardingState {
  draft: OnboardingDraft;
  currentStep: number;
  status: OnboardingSubmissionStatus;
  error: string | null;

  // Actions
  updateDraft: (section: keyof OnboardingDraft, data: any) => void;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  submitDraft: () => Promise<void>;
  clearDraft: () => void;
  clearError: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    // save to asyncstorage

    (set, get) => ({
      draft: {},
      currentStep: 1,
      status: OnboardingSubmissionStatus.IDLE,
      error: null,

      updateDraft: (section, data) =>
        set((state) => ({
          draft: { ...state.draft, [section]: data },
        })),

      setStep: (step) => {
        if (step >= 1 && step <= 5) {
          return set({ currentStep: step });
        }
      },

      nextStep: () => {
        const currentStep = get().currentStep;
        if (currentStep < 5) {
          return set({ currentStep: currentStep + 1 });
        }
      },

      prevStep: () => {
        const currentStep = get().currentStep;
        if (currentStep > 1) {
          return set({ currentStep: currentStep - 1 });
        }
      },

      submitDraft: async () => {
        const { draft } = get();

        if (!draft) {
          throw new Error("No draft data to submit");
        }

        set({ status: OnboardingSubmissionStatus.SUBMITTING, error: null });
        try {
          await submitOnboarding(draft);
          set({
            status: OnboardingSubmissionStatus.SUCCESS,
            draft: {},
            currentStep: 1,
            error: null,
          });
        } catch (err: any) {
          set({
            status: OnboardingSubmissionStatus.ERROR,
            error: err.response?.data?.error?.message || "Submission failed",
          });
          throw err;
        }
      },

      clearDraft: () =>
        set({
          draft: {},
          currentStep: 1,
          status: OnboardingSubmissionStatus.IDLE,
          error: null,
        }),

      clearError: () => set({ error: null }),
    }),

    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
