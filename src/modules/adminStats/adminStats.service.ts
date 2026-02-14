import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middleware/auth";
import IUser from "../../types/user.types";




//get admin stats
const getAdminStats = async(user:IUser)=>{
    if(user.roles !== UserRole.Admin){
        throw new Error("unauthorized")
    }

    const totalUser = await prisma.user.count();
    const totalProvider = await prisma.user.count({
        where:{
            roles: UserRole.Provider
        }
    });
    const totalCustomer = await prisma.user.count({
        where:{
            roles: UserRole.Customer
        }
    });
    const totalOrder = await prisma.order.count();
    const totalPreparingOrder = await prisma.order.count({
        where:{
            status: "PREPARING"
        }
    })
    const totalCancelledOrder = await prisma.order.count({
        where:{
            status:"CANCELLED"
        }
    })

    const totalCompleteOrder = await prisma.order.count({
        where:{
            status:"READY"
        }
    })

    const totalRevenue = await prisma.order.aggregate({
        _sum:{
            totalPrice:true
        }
    })

    return {
        totalUser,
        totalProvider,
        totalCustomer,
        totalOrder,
        totalPreparingOrder,
        totalCancelledOrder,
        totalCompleteOrder,
        totalRevenue
    }
}



export const AdminStatsService = {
    getAdminStats
}