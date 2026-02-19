import request from "supertest";
import app from "../index";
import { store } from "../store";

describe("Onboarding API", () => {
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

  describe("POST /v1/onboarding/submit", () => {
    const validDraft = {
      profile: {
        fullName: "Jane Doe",
        dateOfBirth: "1990-01-01",
        nationality: "US",
      },
      document: {
        documentType: "PASSPORT",
        documentNumber: "A1234567",
      },
      address: {
        addressLine1: "123 Main St",
        city: "New York",
        country: "US",
      },
      consents: {
        termsAccepted: true,
      },
    };

    it("should submit onboarding successfully", async () => {
      const response = await request(app)
        .post("/v1/onboarding/submit")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ draft: validDraft });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("RECEIVED");
    });

    it("should return 400 with invalid draft data", async () => {
      const invalidDraft = {
        ...validDraft,
        profile: { ...validDraft.profile, fullName: "" },
      };

      const response = await request(app)
        .post("/v1/onboarding/submit")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ draft: invalidDraft });

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe("VALIDATION_ERROR");
    });

    it("should return 401 when not authenticated", async () => {
      const response = await request(app)
        .post("/v1/onboarding/submit")
        .send({ draft: validDraft });

      expect(response.status).toBe(401);
    });
  });
});
