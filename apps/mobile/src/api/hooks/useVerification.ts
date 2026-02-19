import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getStatus,
  resetVerification,
  startProcessing,
} from "../services/verification.api";
import { QUERY_KEYS } from "../services/config";
import { useAuthStore } from "../../store";
import { AuthStatus } from "../../../types";

/**
 * Hook for fetching and monitoring verification status
 */
export const useVerificationStatus = () => {
  const { status } = useAuthStore();

  return useQuery({
    queryKey: QUERY_KEYS.VERIFICATION_STATUS,
    queryFn: getStatus,
    // poll eveyr 5 seconds only when user is logged in
    enabled: status === AuthStatus.LOGGED_IN,
    refetchInterval: (query) => {
      const data = query.state.data;
      // contine polling only if the status is in progress

      return data?.status === "IN_PROGRESS" ? 5000 : false;
    },
    staleTime: 4000,
  });
};

/**
 * Hook for starting verification process
 */
export const useStartVerification = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error, data } = useMutation({
    mutationFn: startProcessing,
    onSuccess: () => {
      // Invalidate verification status to trigger a refetch
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.VERIFICATION_STATUS,
      });
    },
  });

  return { startVerfication: mutate, isPending, error, data };
};

// hook for resetting verificaiton status for testing
export const useResetVerification = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: resetVerification,

    onSuccess: () => {
      // Invalidate verification status to trigger a refetch
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.VERIFICATION_STATUS,
      });
    },
  });

  return { resetVerification: mutate, isPending, error };
};
