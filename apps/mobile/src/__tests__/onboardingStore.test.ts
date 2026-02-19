import { useOnboardingStore } from "../store/onboardingStore";

describe("onboardingStore", () => {
  beforeEach(() => {
    // Reset store before each test
    const { clearDraft } = useOnboardingStore.getState();
    clearDraft();
  });

  it("should initialize with correct default values", () => {
    const { draft, currentStep } = useOnboardingStore.getState();

    expect(currentStep).toBe(1);
    expect(draft.profile.fullName).toBe("");
    expect(draft.document.documentType).toBe("PASSPORT");
    expect(draft.consents.termsAccepted).toBe(false);
  });

  it("should update draft profile correctly", () => {
    const { updateDraft } = useOnboardingStore.getState();

    updateDraft("profile", { fullName: "John Doe", nationality: "US" });

    const { draft } = useOnboardingStore.getState();
    expect(draft.profile.fullName).toBe("John Doe");
    expect(draft.profile.nationality).toBe("US");
  });

  it("should handle step navigation", () => {
    const { nextStep, prevStep, setStep } = useOnboardingStore.getState();

    nextStep();
    expect(useOnboardingStore.getState().currentStep).toBe(2);

    prevStep();
    expect(useOnboardingStore.getState().currentStep).toBe(1);

    setStep(4);
    expect(useOnboardingStore.getState().currentStep).toBe(4);
  });

  it("should clear draft", () => {
    const { updateDraft, clearDraft } = useOnboardingStore.getState();

    updateDraft("profile", { fullName: "Dirty Data" });
    clearDraft();

    const { draft, currentStep } = useOnboardingStore.getState();
    expect(draft.profile.fullName).toBe("");
    expect(currentStep).toBe(1);
  });
});
