import express, { Router } from "express";
import { categoriesController } from "./categories.controller";




const router = express.Router();


router.post('/categories', categoriesController.createCategories);


export const categoriesRouter:Router = router




