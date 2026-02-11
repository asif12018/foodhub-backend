import { Request, Response } from "express";
import { profileService } from "./profile.service";








const getProfileInfo = async(req:Request, res:Response)=>{
    try{
       const user = req.user
       if(!user){
         throw new Error("unauthorized")
       }
       const result = await profileService.getProfileInfo(user);
       return res.status(200).json({
        success:false,
        message:"Profile data retrieved successfully",
        data: result
       })
    }catch(err:any){
      return res.status(500).json({
        success: false,
        message: err.message,
        details:err
      })
    }
}


export const profileController = {
    getProfileInfo
}