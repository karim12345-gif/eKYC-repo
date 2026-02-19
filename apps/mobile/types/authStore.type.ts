import { User } from "./user";
import { Session } from "./auth";
import { AuthStatus } from "./enums";

export interface AuthState {
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
