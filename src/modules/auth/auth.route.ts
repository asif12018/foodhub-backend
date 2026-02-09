
import express, { Router } from "express";
import { singOutController } from "./auth.controller";



const router = express.Router();

router.post("/sign-out", singOutController);

export const authRouter:Router = router