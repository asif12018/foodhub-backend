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
            status: "activate"
        }
    });
    return result;
}



//admin stats

const getAdminStats = async(admin:IUser)=>{
    if(admin.roles !== UserRole.Admin){
       throw new Error("unauthorized")
    }
    const totalPreparingOrder = await prisma.order.count({
        where:{
            status:"PREPARING"
        }
    });

    const totalCancelledOrder = await prisma.order.count({
        where:{
            status:"CANCELLED"
        }
    });

    const totalDeliveredOrder = await prisma.order.count({
        where:{
            status:"DELIVERED"
        }
    });

    const totalReadyOrder = await prisma.order.count({
        where:{
            status:"READY"
        }
    });

    const totalUser = await prisma.user.findMany();

    const totalActiveUser = await prisma.user.findMany({
        where:{
            status:"activate"
        }
    });

    const totalDisableUser = await prisma.user.findMany({
        where:{
            status:"suspend"
        }
    })

    const totalMenu = await prisma.meals.count();
    const totalCategories = await prisma.categories.count();

    return {
        totalPreparingOrder, totalCancelledOrder, totalDeliveredOrder, totalReadyOrder, totalUser, totalActiveUser, totalDisableUser, totalMenu, totalCategories
    }
}




//get all order

const getAllOrder = async(admin:IUser)=>{
     if(admin?.roles !== UserRole.Admin){
        throw new Error("unauthorized")
     }

     const result = await prisma.order.findMany();
     return result
}





export const adminService = {
    getAllUser,
    suspendUser,
    activeUser,
    getAdminStats,
    getAllOrder
}