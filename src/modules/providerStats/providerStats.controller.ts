import { Request, Response } from "express";
import { providerStatsService } from "./providerStats.service";

const getProviderStats = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("Unauthorized");
        }
        const result = await providerStatsService.getProviderStats(user);
        res.status(200).json({
            success: true,
            message: "Provider stats retrieved successfully",
            data: result
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err
        });
    }
};


//get provider information
const getProviderInformation = async(req:Request, res:Response)=>{
    try{
     
     const result = await providerStatsService.getProviderInformation(req.params.providerId as string);
     return res.status(200).json({
        success: true,
        message:"Provider Data retrieved successfully",
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

export const providerStatsController = {
    getProviderStats,
    getProviderInformation
};
