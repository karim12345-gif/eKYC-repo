import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VerificationRecord, VerificationStatus } from "../../types";
import { getStatus, startProcessing } from "../api/services";

interface VerificationState {
  status: VerificationStatus;
  record: VerificationRecord | null;
  loading: boolean;
  error: string | null;

  // actions
  fetchStatus: () => Promise<void>;
  startProcessing: () => Promise<void>;
  clearError: () => void;
}

export const useVerificationStore = create<VerificationState>()(
  persist(
    (set, get) => ({
      status: "NOT_STARTED",
      record: null,
      loading: false,
      error: null,

      fetchStatus: async () => {
        set({ loading: true, error: null });
        try {
          const response = await getStatus();
          // The API returns the VerificationRecord directly
          set({
            status: response.status,
            record: response,
            loading: false,
            error: null,
          });
        } catch (err: any) {
          set({
            loading: false,
            error:
              err.response?.data?.error?.message || "Failed to fetch status",
          });
        }
      },

      startProcessing: async () => {
        set({ loading: true, error: null });
        try {
          await startProcessing();
          // After starting process, we fetch status to get the initial 'IN_PROGRESS' state
          // and details if any.
          await get().fetchStatus();
        } catch (err: any) {
          set({
            loading: false,
            error:
              err.response?.data?.error?.message ||
              "Failed to start verification",
          });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "verification-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
