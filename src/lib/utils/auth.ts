import { betterAuth } from "better-auth/*";

import {prismaAdapter} from "better-auth/adapters/prisma";
import { prisma } from "../prisma";





export const auth = betterAuth({
    database: prismaAdapter(prisma,{
        provider: "postgresql"
    }),
    user:{
        additionalFields:{
            roles:{
                type: "string",
                defaultValue: "Customer",
                required: false,
            },
            phone: {
                type:"string",
                required: false
            },
            status: {
                type: "string",
                defaultValue: "activate",
                required:  false
            },
            imageUrl : {
                type: "string",
                required: false
            }
        }
    }
})