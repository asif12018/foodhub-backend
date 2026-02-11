import express, { Router } from "express";
import { orderController } from "./order.controller";
import authMiddleWare, { UserRole } from "../../middleware/auth";



const router:Router = express.Router();




router.post("/:mealId", authMiddleWare(UserRole.Customer),orderController.createOrder);
router.get("/myOrder",authMiddleWare(UserRole.Customer), orderController.getOwnCart);
router.get("/details/:orderId", authMiddleWare(UserRole.Provider,UserRole.Customer), orderController.getOrderById);
router.get("/cart", authMiddleWare(UserRole.Customer), orderController.getAllCart);
router.patch("/checkout/:orderId", authMiddleWare(UserRole.Customer), orderController.checkOut);
export const orderRoute = router;







