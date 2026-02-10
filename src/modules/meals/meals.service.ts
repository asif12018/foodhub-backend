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
            OR: andCondition
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

//get meal by id

const getMealById = async(mealId: string)=>{
    const result = await prisma.meals.findUnique({
        where:{id:mealId}
    });
    return result;
}

//update post
const updateMeal = async(mealId:string, data: Partial<IMeals>, isProvider: boolean, providerId: string)=>{
    const mealsData = await prisma.meals.findFirstOrThrow({
        where:{
            id:mealId
        },
        select:{
            id:true,
            provider_id:true
        }
    });
    
    if(!isProvider && (mealsData.provider_id !== providerId)){
       throw new Error("You are not the owner of the meals")
    }

    const result = await prisma.meals.update({
        where:{
            id:mealId
        },
        data:data
    });

    return result
}


export const menuService = {
    createMenu,
    getAllMenu,
    getMealById,
    updateMeal

}