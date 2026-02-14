import express from "express";
import authMiddleWare, { UserRole } from "../../middleware/auth";
import { adminController } from "./admin.controller";


const router = express.Router();


router.get("/", authMiddleWare(UserRole.Admin), adminController.getAllUser);

router.patch("/suspend/:id", authMiddleWare(UserRole.Admin), adminController.suspendUser);

router.patch("/active/:userId", authMiddleWare(UserRole.Admin), adminController.activeUser);

export const adminRoute = router;