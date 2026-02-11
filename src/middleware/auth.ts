
import { auth as betterAuth } from '../lib/auth';
import { NextFunction, Request, Response } from 'express';



export enum UserRole {
    Customer = "Customer",
    Admin = "Admin",
    Provider = "Provider"
}


declare global {
    namespace Express{
        interface Request{
            user?:{
                id: string;
                name:string;
                email:string;
                roles:string;
                emailVerified:boolean;
            }
        }
    }
}


const authMiddleWare = (...roles: UserRole[])=>{
    return async(req:Request, res:Response, next: NextFunction)=>{
        try{
          const session = await betterAuth.api.getSession({headers: req.headers as any});
          if(!session){
            return res.status(401).json({
                success: false,
                message:"unauthorized access!"
            })
          }
        //   if(!session.user.emailVerified){
        //     return res.status(403).json({
        //         success: false,
        //         message: "email not verified"
        //     })
        //   }

        req.user = {
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
            roles: session.user.roles as string,
            emailVerified: session.user.emailVerified
        }

       
      
        if(roles.length && !roles.includes(req.user.roles as UserRole)){
            return res.status(403).json({
                success:false,
                message:"Forbidden! you don't have permission to access this resources"
            })
        }

        next();

        }catch(err:any){
            console.error("middleware error:", err);
            res.status(500).json({
                success:false,
                message:err.message,
                details:err
            })
        }
    }
}

export default authMiddleWare