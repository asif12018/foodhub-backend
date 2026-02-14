import { Request, Response } from "express";
import { AdminStatsService } from "./adminStats.service";







const adminStats = async(req:Request,res:Response)=>{
    try{
        const user = req.user;
        if(!user){
            throw new Error("unauthorized");
        }

        const result = await AdminStatsService.getAdminStats(user);

        return res.status(200).json({
            success: true,
            message:"Admin stats fetched successfully",
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



export const adminStatsController = {
    adminStats
}