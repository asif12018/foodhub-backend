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
        message:"Review created successfully",
        data: result
       })
    }catch(err:any){
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

//get review

const getReview = async(req: Request, res:Response)=>{
   try{

    const mealId = req.params.mealId

    const result = await reviewService.getReview(mealId as string)

    return res.status(200).json({
        success: true,
        message:"Review retrieved successfully",
        data: result
    })

   }catch(err:any){
       return res.status(500).json({
        success:false,
        message: err.message,
        details: err
       })
   }
}

export const reviewController = {
    createReview,
    getReview
}