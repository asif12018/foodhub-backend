import { Request, Response } from "express";
import { reviewService } from "./review.service";



const createReview = async(req:Request, res:Response)=>{
    try{
       const user = req.user;
       if(!user){
        throw new Error("unauthorized");
       }
       const mealId = req.params.mealId;
       const result = await reviewService.createReview(req.body, user, mealId as string);
       return res.status(201).json({
        success: true,
        messge:"Review created successfully",
        data: result
       })
    }catch(err:any){
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

export const reviewController = {
    createReview
}