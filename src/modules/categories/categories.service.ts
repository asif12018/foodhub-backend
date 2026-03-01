import { prisma } from "../../lib/prisma";
import ICategories from "../../types/categories.types";







//create categories
const createCategories = async(payload: ICategories)=>{
   const result = await prisma.categories.create({
    data: payload
   });

   return result;
}


//get all category

const getAllCategory = async()=>{
   const result = await prisma.categories.findMany({
      where:{
         isDeleted: false
      }
   });
   return result;
}

//get all categories admin

const getAllCategoriesAdmin = async()=>{
   const result = await prisma.categories.findMany();
   return result
}

//update categories

const updateCategories = async(id: string, data: {name: string, isDeleted?: boolean})=>{
   const commentData = await prisma.categories.findFirst({
      where: {
         id: id
      }
   })

   if(!commentData){
      throw new Error("your provided input for categories is invalid")
   }
   const result = await prisma.categories.update({
      where:{
         id:id 
      },
      data
   })

   return result
}

//delete categories

const deleteCategories = async (id: string) =>{
    const commentData = await prisma.categories.findFirst({
      where:{
         id:id
      }
    });

    if(!commentData){
      throw new Error("your provided input for categories is invalid");
    }

    const result = await prisma.categories.update({
      where: {
         id:id
      },
      data:{
         isDeleted: true,
      }
    })

    return result
}

//restore deleted category

const restoreDeletedCategory = async(id:string)=>{
   const deleteData = await prisma.categories.findFirst({
      where:{
         id:id
      }
   });
   if(!deleteData){
      throw new Error("you provided input for categories is invalid")
   }

   const result = await  prisma.categories.update({
      where:{
         id:id
      },
      data:{
         isDeleted: false
      }
   });

   return result
}

export const categoriesService = {
   createCategories,
   updateCategories,
   deleteCategories,
   getAllCategory,
   getAllCategoriesAdmin,
   restoreDeletedCategory
}