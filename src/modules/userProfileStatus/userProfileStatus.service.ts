import { prisma } from "../../lib/prisma"






//get user profile status using email or id



const getUserProfileStatus = async(indentifier: string)=>{
    const res = await prisma.user.findFirst({
        where:{
            OR:[
                {id:indentifier},
                {email: indentifier}
            ]
        }
    });
    return res;
}


export const userProfileStatusService = {
    getUserProfileStatus
}