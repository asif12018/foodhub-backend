import { Request, Response } from "express";
import { categoriesService } from "./categories.service";







//create category



const createCategories = async (req: Request, res: Response)=>{
    try{
       const result = await categoriesService.createCategories(req.body);
       return res.status(201).json({
        success: true,
        message:"Categories created successfully",
        data: result
       })
    }catch(err: any){
        
        return res.status(500).json({
            success: false,
            message: err.message,
            details: err
        })
    }
}

export const categoriesController = {
    createCategories
}