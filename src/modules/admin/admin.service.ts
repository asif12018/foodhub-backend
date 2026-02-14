import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middleware/auth";
import IUser from "../../types/user.types";


//get all user



const getAllUser = async(user:IUser)=>{
    if(user.roles !== UserRole.Admin){
        throw new Error("Unauthorized")
    }
    const result = await prisma.user.findMany({
        where:{
            roles: {
                in: [UserRole.Customer, UserRole.Provider]
            }
        }
    });
    return result;
}



//suspend a user


const suspendUser = async(admin:IUser, userId:string)=>{
    if(admin.roles !== UserRole.Admin){
        throw new Error("Unauthorized")
    }
    const result = await prisma.user.update({
        where:{
            id: userId
        },
        data:{
            status: "suspend"
        }
    });
    return result;
}


//active a user

const activeUser = async(admin:IUser, userId:string)=>{
    if(admin.roles !== UserRole.Admin){
        throw new Error("unauthorized")
    }

    const result = await prisma.user.update({
        where:{
            id: userId
        },
        data:{
            status: "active"
        }
    });
    return result;
}















export const adminService = {
    getAllUser,
    suspendUser,
    activeUser
}