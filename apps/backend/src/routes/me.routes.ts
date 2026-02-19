import { NextFunction, Response, Router } from "express";
import { AuthenticatedRequest } from "../types";
import { authMiddleware } from "../middleware";
import { authService } from "../services";

const router = Router();

// get /v1/me/profile
// get current user profile

router.get(
  "/",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error("USER_NOT_FOUND");
      }

      // get user profile
      const user = await authService.getProfile(req.user.userId);

      res.json(user);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
