import request from "supertest";
import app from "../index";
import { store } from "../store";

describe("Verification API", () => {
  let accessToken: string;

  beforeEach(async () => {
    await store.clearAll();
    // @ts-ignore
    await store.seedTestData();

    // Login to get token
    const loginRes = await request(app).post("/v1/auth/login").send({
      email: "jane.doe@example.com",
      password: "password123",
    });
    accessToken = loginRes.body.accessToken;
  });

  describe("GET /v1/verification/status", () => {
    it("should return verification status for authenticated user", async () => {
      const response = await request(app)
        .get("/v1/verification/status")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("status");
      expect(response.body.status).toBe("NOT_STARTED");
    });
  });

  describe("POST /v1/verification/process", () => {
    it("should start verification process if onboarding is submitted", async () => {
      // First submit onboarding to change status from NOT_STARTED
      await request(app)
        .post("/v1/onboarding/submit")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({
          draft: {
            profile: {
              fullName: "Jane Doe",
              dateOfBirth: "1990-01-01",
              nationality: "US",
            },
            document: { documentType: "PASSPORT", documentNumber: "A1234567" },
            address: {
              addressLine1: "123 Main St",
              city: "New York",
              country: "US",
            },
            consents: { termsAccepted: true },
          },
        });

      const response = await request(app)
        .post("/v1/verification/process")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("PROCESSING_STARTED");
    });

    it("should return 500 when calling process without submission", async () => {
      const response = await request(app)
        .post("/v1/verification/process")
        .set("Authorization", `Bearer ${accessToken}`);

      // The service throws an error which results in 400
      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe("VERIFICATION_NOT_IN_PROGRESS");
    });
  });

  describe("POST /v1/verification/reset", () => {
    it("should reset verification status", async () => {
      const response = await request(app)
        .post("/v1/verification/reset")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Verification reset successfully");

      // Verify status is reset
      const statusRes = await request(app)
        .get("/v1/verification/status")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(statusRes.body.status).toBe("NOT_STARTED");
    });
  });
});
