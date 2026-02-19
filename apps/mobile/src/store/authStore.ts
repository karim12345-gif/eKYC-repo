import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User, Session, AuthStatus } from "../../types";
import { initializeTokenManager } from "../api/services/client";

/**
 * Auth Store
 * Manages authentication state and persistence
 * does not make api calls
 *
 *
 *
 */

interface AuthState {
  status: AuthStatus;
  user: User | null;
  session: Session | null;
  error: string | null;

  // Actions
  setSession: (user: any, session: any) => void;
  setUser: (user: User) => void;
  clearSession: () => void;
  setStatus: (status: AuthStatus) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, _get) => ({
      status: AuthStatus.LOGGED_OUT,
      user: null,
      session: null,
      error: null,

      /**
       * Set session after succesful login
       * called by useLogin hook
       */
      setSession: (user: any, session: any) => {
        set({
          status: AuthStatus.LOGGED_IN,
          user,
          session,
          error: null,
        });
      },

      /**
       * Update current user profile
       * called by useGetMe hook
       */
      setUser: (user: User) => {
        set({ user });
      },

      /**
       * Clear session on logout or error
       *
       */
      clearSession: () => {
        set({
          status: AuthStatus.LOGGED_OUT,
          user: null,
          session: null,
          error: null,
        });
      },

      /**
       * Update auth status
       */
      setStatus: (status: AuthStatus) => {
        set({ status });
      },

      /**
       * Set error message
       */
      setError: (error: string | null) => {
        set({ error });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      // only presist user and session and not status
      partialize: (state) => ({
        user: state.user,
        session: state.session,
      }),

      // afer loading from storage set status based on session
      onRehydrateStorage: () => (state) => {
        if (state?.session) {
          state.status = AuthStatus.LOGGED_IN;
        } else if (state) {
          state.status = AuthStatus.LOGGED_OUT;
        }
      },
    },
  ),
);

// Initialize token manager to bridge axios client ( breaks circular dependency)
initializeTokenManager({
  getSession: () => {
    const state = useAuthStore.getState();
    return { user: state.user, session: state.session };
  },
  setSession: (user, session) => {
    useAuthStore.getState().setSession(user, session);
  },
  clearSession: () => {
    useAuthStore.getState().clearSession();
  },
});
