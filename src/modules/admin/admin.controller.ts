import { Request, Response } from "express";
import { adminService } from "./admin.service";





const getAllUser = async(req:Request, res:Response)=>{
    try{
        const user = req.user;
        if(!user){
            throw new Error("Unauthorized")
        }
        const result = await adminService.getAllUser(user);
        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
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


const suspendUser = async(req:Request, res:Response)=>{
    try{
        const user = req.user;
        if(!user){
            throw new Error("Unauthorized")
        }
        const result = await adminService.suspendUser(user, req.params.id as string);
        return res.status(200).json({
            success: true,
            message: "User suspended successfully",
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


const activeUser = async(req:Request, res:Response)=>{
    try{
        const user = req.user;
        if(!user){
            throw new Error("unauthorized")
        }
        const result = await adminService.activeUser(user, req.params.userId as string);
        return res.status(200).json({
            success: true,
            message: "User activated successfully",
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

export const adminController = {
    getAllUser,
    suspendUser,
    activeUser
}