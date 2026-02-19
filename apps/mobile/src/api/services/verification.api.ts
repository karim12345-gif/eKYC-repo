// verification services
// handles identity verification status and simulation

import { VerificationStatusResponse } from "../../../types";
import { client } from "./client";
import { API_ENDPOINTS } from "./config";

/**
 * Get current verification status
 */
const getStatus = async (): Promise<VerificationStatusResponse> => {
  const response = await client.get<VerificationStatusResponse>(
    API_ENDPOINTS.VERIFICATION_STATUS,
  );
  return response.data;
};

/**
 * Start verification process simulation
 */
const startProcessing = async (): Promise<{
  status: string;
  estimatedTime: string;
}> => {
  const response = await client.post<{
    status: string;
    estimatedTime: string;
  }>(API_ENDPOINTS.VERIFICATION_PROCESS);
  return response.data;
};

/**
 * Reset verification status (development only)
 */
const resetVerification = async (): Promise<{ message: string }> => {
  const response = await client.post<{ message: string }>(
    API_ENDPOINTS.VERIFICATION_RESET,
  );
  return response.data;
};

export { getStatus, startProcessing, resetVerification };
