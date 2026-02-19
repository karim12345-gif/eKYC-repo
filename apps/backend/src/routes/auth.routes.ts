import { NextFunction, Request, Response, Router } from "express";
import { LoginSchema, RefreshSchema } from "../validation";
import { authService } from "../services/auth.service";

const router = Router();

// post /v1/auth/login
// login wiht email and password

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // validate request body
      const { email, password } = LoginSchema.parse(req.body);

      // perform login
      const result = await authService.login(email, password);

      res.json(result);
    } catch (error) {
      next(error);
    }
  },
);

// post /v1/auth/refresh
// refresh access token using refresh token
router.post(
  "/refresh",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // validate request body
      const { refreshToken } = RefreshSchema.parse(req.body);

      // refresh token
      const result = await authService.refresh(refreshToken);

      res.json(result);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
