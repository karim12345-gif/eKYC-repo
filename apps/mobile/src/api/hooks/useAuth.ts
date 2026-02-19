import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login, getMe } from "../services/auth.api";
import { QUERY_KEYS } from "../services/config";
import { useAuthStore } from "../../store/authStore";
import { AuthStatus } from "../../../types";

/**
 * Hook for login mutation
 */
export const useLogin = () => {
  const queryClient = useQueryClient();
  const { setSession, setStatus, setError } = useAuthStore();

  return useMutation({
    mutationFn: ({ email, password }: any) => login(email, password),

    onMutate: () => {
      setStatus(AuthStatus.LOGGING_IN);
      setError(null);
    },

    onSuccess: (response) => {
      setSession(response.user, response.session);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ME });
    },

    onError: (err: any) => {
      setError(err.response?.data?.error?.message || "Login failed");
      setStatus(AuthStatus.LOGGED_OUT);
    },
  });
};

/**
 * Hook for fetching current user profile
 */
export const useGetMe = () => {
  const { status, clearSession } = useAuthStore();

  return useQuery({
    queryKey: QUERY_KEYS.ME,
    queryFn: async () => {
      try {
        return await getMe();
      } catch (err: any) {
        if (err.response?.status === 401) {
          clearSession();
        }
        throw err;
      }
    },
    enabled: status === AuthStatus.LOGGED_IN,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Hook for logout
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  const { clearSession } = useAuthStore();

  const logout = () => {
    clearSession();
    queryClient.clear();
  };

  return { logout };
};
