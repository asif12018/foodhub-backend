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

//update profile

const editProfile = async(req:Request, res:Response)=>{
    try{

      const user = req?.user;
      if(!user){
        throw new Error("unauthorized")
      }

      const result = await profileService.editProfile(user.id as string, req.body.data, req.body.name);
      return res.status(201).json({
        success: true,
        message:"Profile updated",
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

//get provider Profile Data

const getProviderProfile = async(req:Request, res:Response)=>{
    try{

      const result = await profileService.getProviderProfile(req.params.providerId as string);

      return res.status(200).json({
        success: true,
        message:"Provider data retrieve successfully",
        data: result
      })

    }catch(err:any){
      return res.status(500).json({
        success: false,
        message: err.message,
        details: err
      })
    }
}


export const profileController = {
    getProfileInfo,
    editProfile,
    getProviderProfile
}