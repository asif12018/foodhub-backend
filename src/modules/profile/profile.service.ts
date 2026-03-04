import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middleware/auth";
import { userData, userProfileTypes } from "../../types/profile.types";
import IUser from "../../types/user.types";



//get profile data
const getProfileInfo = async(user:IUser)=>{
    const profileData = await prisma.user.findFirstOrThrow({
        where:{
            id:user.id
        },
        include:{
            customerProfile: true
        }
    });

    if(user.id !== profileData.id){
        throw new Error("You don't have permission to perform this action")
    }

    return profileData
}

//edit profile

// const editProfile = async (userId: string, payLoad: userProfileTypes, userData: userData) => {
    
//     // 1. Clean the payload for the Customer Profile
//     // This removes any keys that the frontend didn't send
//     const cleanPayload = Object.fromEntries(
//         Object.entries(payLoad).filter(([_, v]) => v !== undefined)
//     );

//     const profileUpdate = await prisma.customerProfile.update({
//         where: { userId: userId },
//         data: cleanPayload
//     });

//     // 2. Clean the data for the User table
//     if (userData) {
//         const cleanUserData = Object.fromEntries(
//             Object.entries(userData).filter(([_, v]) => v !== undefined)
//         );

//         // Only fire the query if there's actually something to change
//         if (Object.keys(cleanUserData).length > 0) {
//             await prisma.user.update({
//                 where: { id: userId },
//                 data: cleanUserData
//             });
//         }
//     }

//     return profileUpdate;
// };

const editProfile = async (userId: string, payLoad: userProfileTypes, userData: userData) => {
    
    // 1. Clean payload (with safety fallback for undefined)
    const cleanPayload = Object.fromEntries(
        Object.entries(payLoad || {}).filter(([_, v]) => v !== undefined)
    );

    let profileUpdate = null;
    
    // Only fire the profile query if there's actually something to change
    if (Object.keys(cleanPayload).length > 0) {
        profileUpdate = await prisma.customerProfile.update({
            where: { userId: userId },
            data: cleanPayload
        });
    }

    // 2. Clean and update the User table
    if (userData) {
        const cleanUserData = Object.fromEntries(
            Object.entries(userData || {}).filter(([_, v]) => v !== undefined)
        );

        if (Object.keys(cleanUserData).length > 0) {
            await prisma.user.update({
                where: { id: userId },
                data: cleanUserData
            });
        }
    }

    return profileUpdate;
};

//get provider profile

const getProviderProfile = async(providerId:string)=>{
    const providerProfileData = await prisma.providerProfile.findFirstOrThrow({
        where:{
            id:providerId
        },
        include:{
            user:true,
            meals: true
        }
    });
    return providerProfileData
}

//get all provider 
const getAllProvider = async()=>{
    const res = await prisma.user.findMany({
        where:{
            roles:UserRole.Provider
        },
        include:{
            providerProfile:true,
            meals:true
        }
    });

    return res
}




export const profileService = {
    getProfileInfo,
    editProfile,
    getProviderProfile,
    getAllProvider
}