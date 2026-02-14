import { Router } from "express";
import { providerStatsController } from "./providerStats.controller";
import authMiddleWare, { UserRole } from "../../middleware/auth";

const router: Router = Router();

router.get("/", authMiddleWare(UserRole.Provider), providerStatsController.getProviderStats);

export const providerStatsRoute = router;
