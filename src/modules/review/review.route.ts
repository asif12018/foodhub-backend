import express, { Router } from "express";
import authMiddleWare, { UserRole } from "../../middleware/auth";
import { reviewController } from "./review.controller";







const router:Router = express.Router();


router.post("/:mealId", authMiddleWare(UserRole.Customer), reviewController.createReview);



export const reviewRoute = router;