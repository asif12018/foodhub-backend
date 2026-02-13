
import express, { Router } from "express";
import { menuController } from "./meals.controller";
import authMiddleWare, { UserRole } from "../../middleware/auth";



const router:Router = express.Router();


router.post("/menu",authMiddleWare(UserRole.Provider),menuController.createMenu);
router.get("/menu",menuController.getAllMenu);
router.get("/menu/:mealId", menuController.getMealById);
router.patch("/menu/:mealId",authMiddleWare(UserRole.Provider), menuController.updateMeal);
router.delete("/menu/:mealId",authMiddleWare(UserRole.Provider), menuController.deleteMeal);
export const mealsRoute = router;