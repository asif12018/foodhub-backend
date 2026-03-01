import { Router } from "express";
import { providerStatsController } from "./providerStats.controller";
import authMiddleWare, { UserRole } from "../../middleware/auth";

const router: Router = Router();

router.get("/", authMiddleWare(UserRole.Provider), providerStatsController.getProviderStats);

router.get("/:providerId", providerStatsController.getProviderInformation);

export const providerStatsRoute = router;
