import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { submitOnboarding } from "../api/services/onboarding.api";
import { OnboardingDraft, OnboardingSubmissionStatus } from "../../types";

/**
 * Onboarding Store
 * Manages onboarding progress, draft data, and persistence
 */

const INITIAL_DRAFT: OnboardingDraft = {
  profile: {
    fullName: "",
    dateOfBirth: "",
    nationality: "",
  },
  document: {
    documentType: "PASSPORT",
    documentNumber: "",
  },
  address: {
    addressLine1: "",
    city: "",
    country: "",
  },
  consents: {
    termsAccepted: false,
  },
};

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
    (set, get) => ({
      draft: INITIAL_DRAFT,
      currentStep: 1,
      status: OnboardingSubmissionStatus.IDLE,
      error: null,

      updateDraft: (section, data) =>
        set((state) => {
          // Ensure the section exists in the draft to prevent property access errors
          const currentSection = state.draft[section] || INITIAL_DRAFT[section];
          return {
            draft: {
              ...state.draft,
              [section]: { ...currentSection, ...data },
            },
          };
        }),

      setStep: (step) => {
        if (step >= 1 && step <= 5) {
          set({ currentStep: step });
        }
      },

      nextStep: () => {
        const currentStep = get().currentStep;
        if (currentStep < 5) {
          set({ currentStep: currentStep + 1 });
        }
      },

      prevStep: () => {
        const currentStep = get().currentStep;
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 });
        }
      },

      submitDraft: async () => {
        const { draft } = get();

        set({ status: OnboardingSubmissionStatus.SUBMITTING, error: null });
        try {
          await submitOnboarding(draft);
          set({
            status: OnboardingSubmissionStatus.SUCCESS,
            draft: INITIAL_DRAFT,
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
          draft: INITIAL_DRAFT,
          currentStep: 1,
          status: OnboardingSubmissionStatus.IDLE,
          error: null,
        }),

      clearError: () => set({ error: null }),
    }),

    {
      name: "onboarding-storage",
      storage: createJSONStorage(() => AsyncStorage),
      version: 2, // Increment version to trigger fresh initial state for users on older version
      migrate: (persistedState: any, version: number) => {
        if (version < 2) {
          // If the old state doesn't have the expected draft structure, reset it
          return {
            ...persistedState,
            draft: INITIAL_DRAFT,
            version: 2,
          };
        }
        return persistedState;
      },
    },
  ),
);
