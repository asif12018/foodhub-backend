import { Request, Response } from "express";
import { orderService } from "./order.service";





//create order



const createOrder = async(req:Request, res:Response)=>{
    try{
      const user = req.user;
      const customer_id = user?.id;
      const result = await orderService.createOrder(req.params.mealId as string, customer_id as string, req.body);
      return res.status(201).json({
        success:true,
        message:"Order created successfully",
        data: result
      })
    }catch(err: any){
        return res.status(500).json({
            success: false,
            message:err.message,
            details: err
        })
    }
}

//get your own cart

const getOwnCart = async(req:Request, res:Response)=>{
 try{
     const user = req.user;
     if(!user){
        throw new Error("you unauthorized.please log in or signup")
     }
     const result = await orderService.getOwnCart(user.id);
     return res.status(200).json({
        success:true,
        message:"Cart retrieved successfully",
        data: result
     })
 }catch(err:any){
     return res.status(500).json({
        success:false,
        message:err.message,
        details:err
     })
 }
}

//get order by id

const getOrderById = async(req:Request, res:Response)=>{
    try{
       const user = req.user;
       if(!user){
        throw new Error("unauthorized");
       }
  
       const result = await orderService.getOrderById(req.params.orderId as string, user);
       return res.status(200).json({
        success:false,
        message:"Your order retrieved successfully",
        data:result
       })
    }catch(err:any){
        return res.status(500).json({
            success:false,
            message:err.message,
            details:err
        })
    }
}




export const orderController = {
    createOrder,
    getOwnCart,
    getOrderById
}