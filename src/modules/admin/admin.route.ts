import express from "express";
import authMiddleWare, { UserRole } from "../../middleware/auth";
import { adminController } from "./admin.controller";


const router = express.Router();


router.get("/users", authMiddleWare(UserRole.Admin), adminController.getAllUser);

router.get("/adminStats", authMiddleWare(UserRole.Admin),adminController.getAdminStats);

router.get("/order/", authMiddleWare(UserRole.Admin), adminController.getAllOrder);

router.patch("/suspend/:id", authMiddleWare(UserRole.Admin), adminController.suspendUser);

router.patch("/activate/:userId", authMiddleWare(UserRole.Admin), adminController.activeUser);



export const adminRoute = router;