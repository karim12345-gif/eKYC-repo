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

  const { mutate, isPending, error, data } = useMutation({
    mutationFn: ({ email, password }: any) => login(email, password),

    onMutate: () => {
      setStatus(AuthStatus.LOGGING_IN);
      setError(null);
    },

    onSuccess: (response) => {
      // save session to store
      setSession(response.user, response.session);

      // invladiate and refrecht the user data
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ME });
    },

    onError: (err: any) => {
      // set error and reset status
      setError(err.response?.data?.error?.message || "Login failed");
      setStatus(AuthStatus.LOGGED_OUT);
    },
  });

  return { login: mutate, isPending, error, data };
};

/**
 * Hook for fetching current user profile
 */
export const useGetMe = () => {
  const { status, clearSession } = useAuthStore();

  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: QUERY_KEYS.ME,
    queryFn: async () => {
      try {
        return await getMe();
      } catch (err: any) {
        // if 401 force logout to prevent infite loops
        if (err.response?.status === 401) {
          clearSession();
        }
        throw err;
      }
    },
    enabled: status === AuthStatus.LOGGED_IN, // only fetch when logged in
    retry: false, // dont retry on error
    staleTime: 5 * 60 * 1000, // 5 mins
  });

  return { data, user: data, isLoading, error, refetch, isRefetching };
};

/**
 * Hook for logout
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  const { clearSession } = useAuthStore();

  const logout = () => {
    // clear session from store
    clearSession();

    // clear all cached queries
    queryClient.clear();
  };

  return { logout };
};
