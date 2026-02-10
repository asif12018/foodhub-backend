
import express, { Router } from "express";
import { menuController } from "./meals.controller";
import authMiddleWare, { UserRole } from "../../middleware/auth";



const router:Router = express.Router();


router.post("/menu",authMiddleWare(UserRole.Provider),menuController.createMenu);
router.get("/menu",menuController.getAllMenu);


export const mealsRoute = router;