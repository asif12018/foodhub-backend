import { prisma } from "../../lib/prisma";
import ICategories from "../../types/categories.types";







//create categories
const createCategories = async(payload: ICategories)=>{
   const result = await prisma.categories.create({
    data: payload
   });

   return result;
}


export const categoriesService = {
   createCategories
}