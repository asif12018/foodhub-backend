import express, { Router } from "express";
import { categoriesController } from "./categories.controller";




const router = express.Router();


router.post('/categories', categoriesController.createCategories);
router.patch('/categories/:categoriesId', categoriesController.updateCategories);
router.delete('/categories/:categoriesId', categoriesController.deleteCategories);

export const categoriesRouter:Router = router




