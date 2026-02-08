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

//update category

const updateCategories = async (req:Request, res:Response) =>{
    try{

        const {categoriesId} = req.params;
        const result = await categoriesService.updateCategories(categoriesId as string,req.body);

        return res.status(201).json({
            success: true,
            message:"Categories update successfully",
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

//delete categories

const deleteCategories = async(req: Request, res: Response) =>{
    try{

        const {categoriesId} = req.params;
        const result = await categoriesService.deleteCategories(categoriesId as string);
        return res.status(201).json({
            success:true,
            message: "categories deleted successfully",
            data: result
        })

    }catch(err:any){
        return res.status(500).json({
            success: true,
            message: err.message,
            details: err
        })
    }
}

export const categoriesController = {
    createCategories,
    updateCategories,
    deleteCategories
}