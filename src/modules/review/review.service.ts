import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middleware/auth";
import IReview from "../../types/review.types";
import IUser from "../../types/user.types";








//create review



const createReview = async(payload:IReview, user:IUser, mealId:string)=>{
     if(user.roles !== UserRole.Customer){
         throw new Error("you dont have permisson to perform this action")
     }

     const mealData = await prisma.meals.findFirstOrThrow({
        where:{
            id:mealId,
            
        }
     });

     if(!mealData){
        throw new Error("No order found")
     }

     const reviewData = {
            userId: user.id,
            mealId: mealData.id,
            providerId: mealData.provider_id,
            rating: payload.rating,
            comment: payload.comment
     }

     const result = await prisma.reviews.create({
        data: reviewData
     });

     return result;
}





export const reviewService = {
    createReview
}