import express, { Router } from "express";
import authMiddleWare, { UserRole } from "../../middleware/auth";
import { adminStatsController } from "./adminStats.controller";






const router:Router = express.Router();


router.get("/", authMiddleWare(UserRole.Admin), adminStatsController.adminStats);



export const adminStatsRoute = router;