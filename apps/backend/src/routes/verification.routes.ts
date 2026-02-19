import { NextFunction, Response, Router } from "express";
import { authMiddleware } from "../middleware";
import { AuthenticatedRequest } from "../types";
import { verificationService } from "../services";

const router = Router();

// get /v1/verification/status
// get current verification status for authenticated user
router.get(
  "/status",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error("UNAUTHORIZED");
      }

      // get verification status
      const status = await verificationService.getStatus(req.user.userId);

      res.json(status);
    } catch (error) {
      next(error);
    }
  },
);

// post /v1/verification/process
// process verification for authenticated user
router.post(
  "/process",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error("UNAUTHORIZED");
      }

      // start verification process
      const result = await verificationService.processVerification(
        req.user.userId,
      );

      res.json(result);
    } catch (error) {
      next(error);
    }
  },
);

// post /v1/verification/reset
// reset verification for authenticated user (testing)
router.post(
  "/reset",
  authMiddleware,
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error("UNAUTHORIZED");
      }

      // reset verification
      await verificationService.resetVerification(req.user.userId);

      res.json({ message: "Verification reset successfully" });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
