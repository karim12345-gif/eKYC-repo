// IN_MEMORY DATA store
import { User, Session, OnboardingDraft, VerificationRecord } from "./types";
import bcrypt from "bcrypt";

class InMemoryStore {
  private users: Map<string, User> = new Map();
  private sessions: Map<string, Session> = new Map();
  private onboardingDrafts: Map<string, OnboardingDraft> = new Map();
  private verificationStatuses: Map<string, VerificationRecord> = new Map();

  constructor() {
    this.seedTestData();
  }

  // SEED TEST DATA
  private async seedTestData() {
    // create test user: jane.doe@exmaple.com/ password123
    const testUser: User = {
      id: "UR-001",
      email: "jane.doe@example.com",
      fullName: "Jane Doe",
      passwordHash: await bcrypt.hash("password123", 10),
    };

    this.users.set(testUser.email.toLowerCase(), testUser);

    // initialize verification status as NOT_STARTED
    this.verificationStatuses.set(testUser.id, {
      status: "NOT_STARTED",
      updatedAt: new Date().toISOString(),
      details: { reasons: [] },
    });

    console.log("Test user seeded: jane.doe@example.com / password123");
  }

  // USER OPERATIONS

  getUserByEmail(email: string): User | undefined {
    return this.users.get(email.toLowerCase());
  }

  getUserById(id: string): User | undefined {
    return Array.from(this.users.values()).find((u) => u.id === id);
  }

  createUser(user: User): User {
    const normalizedUser = { ...user, email: user.email.toLowerCase() };
    this.users.set(normalizedUser.email, normalizedUser);
    return normalizedUser;
  }

  // SESSION OPERATIONS

  saveSession(
    token: string,
    session: Session & { tokeType?: string },
  ): Session {
    this.sessions.set(token, session);
    return session;
  }

  getSession(token: string): Session | undefined {
    return this.sessions.get(token);
  }

  deleteSession(token: string): boolean {
    return this.sessions.delete(token);
  }

  // onboarding draft operations

  saveOnboardingDraft(userId: string, draft: OnboardingDraft): OnboardingDraft {
    this.onboardingDrafts.set(userId, draft);
    return draft;
  }

  getOnboardingDraft(userId: string): OnboardingDraft | undefined {
    return this.onboardingDrafts.get(userId);
  }

  deleteOnboardingDraft(userId: string): boolean {
    return this.onboardingDrafts.delete(userId);
  }

  // Verification Status operations

  getVerificationStatus(userId: string): VerificationRecord | undefined {
    return this.verificationStatuses.get(userId);
  }

  updateVerificationStatus(
    userId: string,
    status: VerificationRecord,
  ): VerificationRecord {
    this.verificationStatuses.set(userId, status);
    return status;
  }

  deleteVerificationStatus(userId: string): boolean {
    return this.verificationStatuses.delete(userId);
  }

  // UTILTY MEthods
  async clearAll(): Promise<boolean> {
    this.users.clear();
    this.sessions.clear();
    this.onboardingDrafts.clear();
    this.verificationStatuses.clear();
    return true;
  }
}

// Export singleton instance
export const store = new InMemoryStore();
