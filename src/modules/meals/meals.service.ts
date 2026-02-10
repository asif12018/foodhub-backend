import { prisma } from "../../lib/prisma";
import IMeals from "../../types/meals.types";
import { Prisma } from '../../../prisma/generated/prisma/client';






//create meals



const createMenu = async(payload: IMeals, userId:string)=>{
    const result = await prisma.meals.create({
       data:{
        ...payload,
        provider_id: userId,
        profileId: userId
       }
    });
    return result;
}

//get all meal
const getAllMenu = async(payload:{
    search: string | undefined;
    isFeatured: boolean | undefined;
    isAvailable: boolean | undefined;
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: string;
})=>{
    const andCondition: Prisma.MealsWhereInput[] = [];
    if (payload.search){
        andCondition.push({
           OR:[
            {
                name:{
                    contains: payload.search,
                    mode:"insensitive"
                }
            }
           ]
        })
    }
    if(typeof payload.isFeatured === "boolean"){
          andCondition.push({isFeatured: payload.isFeatured})
    }
    if(typeof payload.isAvailable === "boolean"){
          andCondition.push({isAvailable: payload.isAvailable})
    }
     const page = payload.page;
     const limit = payload.limit;
     const result = await prisma.meals.findMany({
        take: limit,
        skip: payload.skip,
        where:{
            AND: andCondition
        },
        orderBy: {
            [payload.sortBy]: payload.sortOrder,
        },
        include:{
            _count: {
                select:{reviews: true}
            }
        }
     });
     const total = await prisma.meals.count({
        where:{
            AND:andCondition
        }
     })
     return {
        data: result,
        pagination: {
            total,
            page,
            limit,
            totalPage: Math.ceil(total/limit)
        }
     };
}


export const menuService = {
    createMenu,
    getAllMenu
}