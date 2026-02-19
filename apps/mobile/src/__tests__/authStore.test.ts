import { useAuthStore } from "../store/authStore";
import { AuthStatus } from "../../types";

describe("authStore", () => {
  beforeEach(() => {
    // Reset store
    const { clearSession } = useAuthStore.getState();
    clearSession();
  });

  it("should initialize with LOGGED_OUT status", () => {
    const { status, user, session } = useAuthStore.getState();

    expect(status).toBe(AuthStatus.LOGGED_OUT);
    expect(user).toBeNull();
    expect(session).toBeNull();
  });

  it("should set session correctly after login", () => {
    const { setSession } = useAuthStore.getState();
    const mockUser = {
      id: "1",
      email: "test@example.com",
      fullName: "Test User",
    };
    const mockSession = { accessToken: "acc_123", refreshToken: "ref_123" };

    setSession(mockUser, mockSession);

    const { status, user, session } = useAuthStore.getState();
    expect(status).toBe(AuthStatus.LOGGED_IN);
    expect(user).toEqual(mockUser);
    expect(session).toEqual(mockSession);
  });

  it("should clear session on logout", () => {
    const { setSession, clearSession } = useAuthStore.getState();
    setSession({ id: "1" }, { accessToken: "token" });

    clearSession();

    const { status, user, session } = useAuthStore.getState();
    expect(status).toBe(AuthStatus.LOGGED_OUT);
    expect(user).toBeNull();
    expect(session).toBeNull();
  });

  it("should set error message", () => {
    const { setError } = useAuthStore.getState();

    setError("Invalid credentials");
    expect(useAuthStore.getState().error).toBe("Invalid credentials");

    setError(null);
    expect(useAuthStore.getState().error).toBeNull();
  });
});
