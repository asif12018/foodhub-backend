

import express, { Router } from "express";
import { userProfileController } from "./userProfileStatus.controller";
import authMiddleWare, { UserRole } from "../../middleware/auth";





const router:Router = express.Router();

router.get("/", authMiddleWare(UserRole.Customer, UserRole.Provider),userProfileController.getUserProfileStatusAuto)

router.get("/:identifier", userProfileController.getUserProfileStatus);





export const userStatusUser = router