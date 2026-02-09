import { Request, Response } from "express";
import { auth } from "../../lib/auth";







export const singOutController = async(req:Request, res: Response)=>{
    try{
       await auth.api.signOut({
        headers: req.headers as any
       });
       return res.status(200).json({
        success: true,
        message: "Signed out successfully"
       });
    }catch(err:any){
      return res.status(500).json({
        success: false,
        message: err.message,
        error: err
      })
    }
}