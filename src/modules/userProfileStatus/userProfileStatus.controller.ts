import { Request, Response } from "express";
import { userProfileStatusService } from "./userProfileStatus.service";





//get user profile status by email or id



const getUserProfileStatus = async(req:Request, res:Response)=>{
   try{
      const result = await userProfileStatusService.getUserProfileStatus(req.params.identifier as string);

      return res.status(200).json({
        success: true,
        message: "User profile status retrieve successful",
        data: result
      })
   }catch(err:any){
      return res.status(500).json({
        success: false,
        message:err.message,
        details: err
      })
   }
}

//get user profile details auto


const getUserProfileStatusAuto = async(req:Request, res:Response)=>{
   try{

      const user = req.user;
      const result = await userProfileStatusService.getUserProfileStatus(user?.id as string);

      return res.status(200).json({
         success: true,
         message:"User profile status retrieve successful",
         data: result
      })

   }catch(err:any){
       return res.status(500).json({
         success: false,
         message:err.message,
         details: err
       })
   }
}


export const userProfileController = {
    getUserProfileStatus,
    getUserProfileStatusAuto
}