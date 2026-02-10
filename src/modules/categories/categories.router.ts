import express, { Router } from "express";
import { categoriesController } from "./categories.controller";
import authMiddleWare, { UserRole } from "../../middleware/auth";




const router = express.Router();


router.post('/categories', authMiddleWare(UserRole.Admin),categoriesController.createCategories);
router.patch('/categories/:categoriesId', authMiddleWare(UserRole.Admin),categoriesController.updateCategories);
router.delete('/categories/:categoriesId', authMiddleWare(UserRole.Admin),categoriesController.deleteCategories);

export const categoriesRouter:Router = router




