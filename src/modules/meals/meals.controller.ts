import { Request, Response } from "express";
import { menuService } from "./meals.service";
import paginationSortingHelper from "../../helper/paginationSortingHelper";
import { UserRole } from "../../middleware/auth";







const createMenu = async(req:Request,res:Response)=>{
    try{ 
       const data = req.body;
       if(data.length === 0){
        return res.status(404).json({
            success: false,
            message: "missing data on req.body"
        })
       }

       const user = req.user;
       if(!user){
        return res.status(400).json({
            success:false,
            message: "Unauthorized"
        })
       }
       const result = await menuService.createMenu(data, user.id as string);
       return res.status(201).json({
        success: true,
        message:"Menu created success fully",
        data: result
       })
    }catch(err:any){
        return res.status(500).json({
            success: false,
            message:err.message,
            details:err
        })
    }
}

//get all post

const getAllMenu = async(req:Request, res:Response) =>{
    try{
        const {search} = req.query;
        const searchString = typeof search === "string" ? search: undefined;
        //accepting true and false
        const isFeatured = req.query.isFeatured === "true" ? true : req.query.isFeatured === "false" ? false: undefined;
        const isAvailable = req.query.isAvailable === "true" ? true : req.query.isAvailable === "false" ? false : undefined;
        const options = paginationSortingHelper(req.query);
        const {page, limit, skip, sortBy, sortOrder} = options;
    const result = await menuService.getAllMenu({
        search: searchString,
        isFeatured,
        isAvailable,
        page,
        limit,
        skip,
        sortBy,
        sortOrder
    });
    return res.status(200).json({
        success:true,
        message:"Menu retrieved successfully",
        data:result
    })
    
    }catch(err:any){
      return res.status(500).json({
        success:false,
        message: err.message,
        details:err
      })
    }
}

//get post by id
const getMealById = async(req:Request, res:Response) =>{
    try{
      const result = await menuService.getMealById(req.params.mealId as string);
      if(!result){
         return res.status(404).json({
            success:false,
            message:"Meals not exist",
            data: {}
         })
      }
      return res.status(200).json({
        success: true,
        message:"Menu retrieved successfully",
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

//update meals

const updateMeal = async(req:Request, res:Response) =>{
    try{
        let isProvider = false;
       const user = req.user;
       if(!user){
        throw new Error("You are not authorized")
       };
       if(user.roles !== UserRole.Provider){
        throw new Error("You don't have permission to perform this action")
       }
       if(user.roles === UserRole.Provider){
         isProvider = true
       }
       const result = await menuService.updateMeal(req.params.mealId as string,  req.body,isProvider, user.id);
       return res.status(201).json({
        success: true,
        message:"Meal update successfully",
        data: result
       })
    }catch(err:any){
      return res.status(500).json({
        success:false,
        message:err.message,
        details:err
      })
    }
}


export const menuController = {
    createMenu,
    getAllMenu,
    getMealById,
    updateMeal

}