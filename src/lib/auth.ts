import { betterAuth } from "better-auth";

import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      roles: {
        type: "string",
        defaultValue: "Customer",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "activate",
        required: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const role = user.roles;

          if (role === "Customer") {
            await prisma.customerProfile.create({
              data: {
                id: crypto.randomUUID(),
                userId: user.id,
              },
            });
          } else if (role === "Provider") {
            await prisma.providerProfile.create({
              data: {
                id: crypto.randomUUID(),
                userId: user.id
              },
            });
          }
        },
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
  },
  trustedOrigins: [process.env.BETTER_AUTH_URL!, "http://localhost:5000"],
});

