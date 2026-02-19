import request from "supertest";
import app from "../index";
import { store } from "../store";

describe("Auth API", () => {
  beforeEach(async () => {
    await store.clearAll();
    // @ts-ignore - accessing private method for testing
    await store.seedTestData();
  });

  describe("POST /v1/auth/login", () => {
    it("should login successfully with correct credentials", async () => {
      const response = await request(app).post("/v1/auth/login").send({
        email: "jane.doe@example.com",
        password: "password123",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("accessToken");
      expect(response.body).toHaveProperty("refreshToken");
      expect(response.body.user.email).toBe("jane.doe@example.com");
    });

    it("should return 401 with incorrect password", async () => {
      const response = await request(app).post("/v1/auth/login").send({
        email: "jane.doe@example.com",
        password: "wrongpassword",
      });

      expect(response.status).toBe(401);
      expect(response.body.error.code).toBe("INVALID_CREDENTIALS");
    });

    it("should return 400 with invalid email format", async () => {
      const response = await request(app).post("/v1/auth/login").send({
        email: "invalid-email",
        password: "password123",
      });

      expect(response.status).toBe(400);
      expect(response.body.error.code).toBe("VALIDATION_ERROR");
    });
  });

  describe("POST /v1/auth/refresh", () => {
    it("should refresh token successfully with valid refresh token", async () => {
      // First login to get a refresh token
      const loginRes = await request(app).post("/v1/auth/login").send({
        email: "jane.doe@example.com",
        password: "password123",
      });

      const { refreshToken } = loginRes.body;

      const response = await request(app)
        .post("/v1/auth/refresh")
        .send({ refreshToken });

      expect(response.status).toBe(200);
      expect(response.body.session).toHaveProperty("accessToken");
      expect(response.body.session).toHaveProperty("refreshToken");
    });

    it("should return 401 with invalid refresh token", async () => {
      const response = await request(app)
        .post("/v1/auth/refresh")
        .send({ refreshToken: "invalid-token" });

      expect(response.status).toBe(401);
      expect(response.body.error.code).toBe("INVALID_REFRESH_TOKEN");
    });
  });
});
