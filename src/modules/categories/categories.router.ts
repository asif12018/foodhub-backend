import express, { Router } from "express";
import { categoriesController } from "./categories.controller";
import authMiddleWare, { UserRole } from "../../middleware/auth";




const router = express.Router();


router.post('/categories', authMiddleWare(UserRole.Admin),categoriesController.createCategories);
router.get("/categories", categoriesController.getAllCategory);
router.get("/categories/admin", categoriesController.getAllCategoriesAdmin);
router.patch('/categories/:categoriesId', authMiddleWare(UserRole.Admin),categoriesController.updateCategories);
router.delete('/categories/:categoriesId', authMiddleWare(UserRole.Admin),categoriesController.deleteCategories);
router.patch("/categories/restore/:categoriesId", authMiddleWare(UserRole.Admin), categoriesController.restoreDeletedCategory);


export const categoriesRouter:Router = router




