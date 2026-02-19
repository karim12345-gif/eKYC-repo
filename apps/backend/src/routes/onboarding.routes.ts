import { NextFunction, Response, Router } from "express";
import { authMiddleware } from "../middleware";
import { AuthenticatedRequest } from "../types";
import { OnboardingSubmitSchema } from "../validation";
import { onboardingService } from "../services";

const router = Router();

// post /v1/onboarding/submit
// submit onbaording draft requires authentication
router.post(
  "/submit",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error("UNAUTHORIZED");
      }
      // validate request body
      const { draft } = OnboardingSubmitSchema.parse(req.body);

      // submit onbaording
      const result = await onboardingService.submitOnboarding(
        req.user.userId,
        draft,
      );

      res.json(result);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
