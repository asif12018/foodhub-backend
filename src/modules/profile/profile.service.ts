import { prisma } from "../../lib/prisma";
import IUser from "../../types/user.types";



//get profile data
const getProfileInfo = async(user:IUser)=>{
    const profileData = await prisma.user.findFirstOrThrow({
        where:{
            id:user.id
        }
    });

    if(user.id !== profileData.id){
        throw new Error("You don't have permission to perform this action")
    }

    return profileData
}



export const profileService = {
    getProfileInfo
}