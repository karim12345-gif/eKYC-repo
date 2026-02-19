import request from "supertest";
import app from "../index";
import { store } from "../store";

describe("Me API", () => {
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

  describe("GET /v1/me", () => {
    it("should return user profile when authenticated", async () => {
      const response = await request(app)
        .get("/v1/me")
        .set("Authorization", `Bearer ${accessToken}`);

      expect(response.status).toBe(200);
      expect(response.body.email).toBe("jane.doe@example.com");
      expect(response.body.fullName).toBe("Jane Doe");
    });

    it("should return 401 when not authenticated", async () => {
      const response = await request(app).get("/v1/me");

      expect(response.status).toBe(401);
      expect(response.body.error.code).toBe("UNAUTHORIZED");
    });

    it("should return 401 with invalid token", async () => {
      const response = await request(app)
        .get("/v1/me")
        .set("Authorization", "Bearer invalid-token");

      expect(response.status).toBe(401);
      expect(response.body.error.code).toBe("UNAUTHORIZED");
    });
  });
});
