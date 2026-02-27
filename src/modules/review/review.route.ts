import express, { Router } from "express";
import authMiddleWare, { UserRole } from "../../middleware/auth";
import { reviewController } from "./review.controller";







const router:Router = express.Router();


router.post("/:mealId", authMiddleWare(UserRole.Customer), reviewController.createReview);

router.get("/:mealId", authMiddleWare(UserRole.Customer, UserRole.Provider),reviewController.getReview);

export const reviewRoute = router;