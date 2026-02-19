import { store } from "../store";
import { VerificationRecord } from "../types";

// this serivvce manges ther verification workflow:
// getStatus --> return current verification status for a user
// processVerification -> simulate async verification like a real review process

const getStatus = async (userId: string): Promise<VerificationRecord> => {
  const status = await store.getVerificationStatus(userId);

  // return default status if not found
  if (!status) {
    return {
      status: "NOT_STARTED",
      updatedAt: new Date().toISOString(),
      details: { reasons: [] },
    };
  }

  return status;
};

const processVerification = async (
  userId: string,
): Promise<{ status: string; estimatedTime: string }> => {
  // check if user has submitted onboarding
  const currentStatus = await store.getVerificationStatus(userId);

  if (!currentStatus || currentStatus.status !== "IN_PROGRESS" && status !== "NOT_STARTED") {
    throw new Error("VERIFICATION_NOT_IN_PROGRESS");
  }

  // return immeditaly - processing time
  const estimatedTime = "5-10 seconds";

  // simulate async processing
  simulateVerificationProcess(userId);

  return { status: "PROCESSING_STARTED", estimatedTime };
};

// simulate the actaul verification process
const simulateVerificationProcess = async (userId: string): Promise<void> => {
  // random delay betwen 5-10 seconds
  const delay = Math.floor(Math.random() * 5000) + 5000;

  console.log(
    `verification step started for user ${userId} with delay ${delay}ms`,
  );

  await new Promise((resolve) => setTimeout(resolve, delay));

  // randomly determine outcome

  const random = Math.random();
  let finalStatus: "APPROVED" | "MANUAL_REVIEW" | "REJECTED";
  let reasons: string[] = [];

  // 70% approved
  // 20% manual review
  // 10% rejected

  if (random < 0.7) {
    finalStatus = "APPROVED";
  } else if (random < 0.9) {
    finalStatus = "MANUAL_REVIEW";
    reasons = ["Additional docuemntation required"];
  } else {
    finalStatus = "REJECTED";
    reasons = ["Identity verification failed"];
  }

  // update verification status to COMPLETED
  store.updateVerificationStatus(userId, {
    status: finalStatus,
    updatedAt: new Date().toISOString(),
    details: { reasons },
  });
};

// reset verification status to not stasrted for testing purposes
const resetVerification = async (userId: string): Promise<void> => {
  store.deleteOnboardingDraft(userId);
  store.updateVerificationStatus(userId, {
    status: "NOT_STARTED",
    updatedAt: new Date().toISOString(),
    details: { reasons: [] },
  });
};

export const verificationService = {
  getStatus,
  processVerification,
  resetVerification,
};
