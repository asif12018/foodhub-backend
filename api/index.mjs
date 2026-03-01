// src/app.ts
import express9 from "express";

// src/middleware/notFound.ts
function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: "Route not found!!",
    path: req.originalUrl,
    date: Date()
  });
}

// src/modules/categories/categories.router.ts
import express from "express";

// src/lib/prisma.ts
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

// prisma/generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// prisma/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'enum Role {\n  Admin\n  Customer\n  Provider\n}\n\nmodel User {\n  id            String   @id @default(cuid())\n  name          String\n  email         String   @unique\n  emailVerified Boolean  @default(false)\n  image         String?\n  createdAt     DateTime @default(now())\n  updatedAt     DateTime @updatedAt\n  roles         Role?    @default(Customer)\n\n  phone           String?\n  status          String?          @default("activate")\n  sessions        Session[]\n  accounts        Account[]\n  customerProfile CustomerProfile?\n  providerProfile ProviderProfile?\n  meals           Meals[]\n\n  providedOrders Order[]   @relation("ProviderOrders")\n  placedOrders   Order[]   @relation("CustomerOrders")\n  reviews        Reviews[]\n\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nmodel ProviderProfile {\n  id             String    @id\n  userId         String    @unique\n  user           User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  RestaurantName String?\n  address        String?\n  city           String?\n  isOpen         Boolean?  @default(true)\n  openingTime    DateTime?\n  closingTime    DateTime?\n  ratingAvg      Float?    @default(3)\n  ratingCount    Int?      @default(0)\n  meals          Meals[]\n  createdAt      DateTime  @default(now())\n  updateAt       DateTime  @updatedAt\n}\n\nmodel CustomerProfile {\n  id      String  @id\n  userId  String  @unique\n  user    User    @relation(fields: [userId], references: [id])\n  address String?\n  city    String?\n}\n\nmodel Categories {\n  id        String   @id @default(uuid())\n  name      String   @unique\n  icon      String?\n  isDeleted Boolean? @default(false)\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  meals     Meals[]\n}\n\nmodel Meals {\n  id            String       @id @default(ulid())\n  provider_id   String\n  category_id   String\n  name          String\n  description   String?\n  cuisine       String?\n  price         Float\n  discountPrice Float?\n  imageUrl      String?\n  isAvailable   Boolean?     @default(true)\n  isFeatured    Boolean?     @default(false)\n  isDeleted     Boolean?     @default(false)\n  category      Categories   @relation(fields: [category_id], references: [id])\n  dietary_tags  DietaryTag[]\n\n  user User @relation(fields: [provider_id], references: [id])\n\n  prepTimeMinutes Int?\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  reviews Reviews[]\n\n  orders    Order[]\n  profileId String?\n  profile   ProviderProfile? @relation(fields: [profileId], references: [userId])\n}\n\nenum DietaryTag {\n  HALAL\n  VEG\n  KETO\n  GLUTEN_FREE\n  DAIRY_FREE\n}\n\nmodel Order {\n  id              Int         @id @default(autoincrement())\n  mealId          String\n  mealName        String\n  status          OrderStatus @default(PREPARING)\n  price           Float\n  discountPrice   Float?\n  quantity        Int\n  totalPrice      Float\n  deliveryAddress String?\n\n  meal Meals @relation(fields: [mealId], references: [id])\n\n  provider_id String\n  customer_id String\n\n  provider User @relation("ProviderOrders", fields: [provider_id], references: [id])\n  customer User @relation("CustomerOrders", fields: [customer_id], references: [id])\n}\n\nenum OrderStatus {\n  PREPARING\n  READY\n  CANCELLED\n  DELIVERED\n}\n\nmodel Reviews {\n  id         String  @id @default(uuid())\n  userId     String\n  mealId     String\n  providerId String\n  rating     Int\n  comment    String?\n\n  createdAt DateTime @default(now())\n\n  meal Meals @relation(fields: [mealId], references: [id])\n  //extra code. if not work then remove it\n  user User  @relation(fields: [userId], references: [id])\n\n  @@unique([userId, mealId])\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"roles","kind":"enum","type":"Role"},{"name":"phone","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"customerProfile","kind":"object","type":"CustomerProfile","relationName":"CustomerProfileToUser"},{"name":"providerProfile","kind":"object","type":"ProviderProfile","relationName":"ProviderProfileToUser"},{"name":"meals","kind":"object","type":"Meals","relationName":"MealsToUser"},{"name":"providedOrders","kind":"object","type":"Order","relationName":"ProviderOrders"},{"name":"placedOrders","kind":"object","type":"Order","relationName":"CustomerOrders"},{"name":"reviews","kind":"object","type":"Reviews","relationName":"ReviewsToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"},"ProviderProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ProviderProfileToUser"},{"name":"RestaurantName","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"city","kind":"scalar","type":"String"},{"name":"isOpen","kind":"scalar","type":"Boolean"},{"name":"openingTime","kind":"scalar","type":"DateTime"},{"name":"closingTime","kind":"scalar","type":"DateTime"},{"name":"ratingAvg","kind":"scalar","type":"Float"},{"name":"ratingCount","kind":"scalar","type":"Int"},{"name":"meals","kind":"object","type":"Meals","relationName":"MealsToProviderProfile"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updateAt","kind":"scalar","type":"DateTime"}],"dbName":null},"CustomerProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"CustomerProfileToUser"},{"name":"address","kind":"scalar","type":"String"},{"name":"city","kind":"scalar","type":"String"}],"dbName":null},"Categories":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"icon","kind":"scalar","type":"String"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"meals","kind":"object","type":"Meals","relationName":"CategoriesToMeals"}],"dbName":null},"Meals":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"provider_id","kind":"scalar","type":"String"},{"name":"category_id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"cuisine","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"discountPrice","kind":"scalar","type":"Float"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"isAvailable","kind":"scalar","type":"Boolean"},{"name":"isFeatured","kind":"scalar","type":"Boolean"},{"name":"isDeleted","kind":"scalar","type":"Boolean"},{"name":"category","kind":"object","type":"Categories","relationName":"CategoriesToMeals"},{"name":"dietary_tags","kind":"enum","type":"DietaryTag"},{"name":"user","kind":"object","type":"User","relationName":"MealsToUser"},{"name":"prepTimeMinutes","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"reviews","kind":"object","type":"Reviews","relationName":"MealsToReviews"},{"name":"orders","kind":"object","type":"Order","relationName":"MealsToOrder"},{"name":"profileId","kind":"scalar","type":"String"},{"name":"profile","kind":"object","type":"ProviderProfile","relationName":"MealsToProviderProfile"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"Int"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"mealName","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"price","kind":"scalar","type":"Float"},{"name":"discountPrice","kind":"scalar","type":"Float"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"totalPrice","kind":"scalar","type":"Float"},{"name":"deliveryAddress","kind":"scalar","type":"String"},{"name":"meal","kind":"object","type":"Meals","relationName":"MealsToOrder"},{"name":"provider_id","kind":"scalar","type":"String"},{"name":"customer_id","kind":"scalar","type":"String"},{"name":"provider","kind":"object","type":"User","relationName":"ProviderOrders"},{"name":"customer","kind":"object","type":"User","relationName":"CustomerOrders"}],"dbName":null},"Reviews":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"meal","kind":"object","type":"Meals","relationName":"MealsToReviews"},{"name":"user","kind":"object","type":"User","relationName":"ReviewsToUser"}],"dbName":null}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// prisma/generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// prisma/generated/prisma/enums.ts
var OrderStatus = {
  PREPARING: "PREPARING",
  READY: "READY",
  CANCELLED: "CANCELLED",
  DELIVERED: "DELIVERED"
};

// prisma/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/modules/categories/categories.service.ts
var createCategories = async (payload) => {
  const result = await prisma.categories.create({
    data: payload
  });
  return result;
};
var getAllCategory = async () => {
  const result = await prisma.categories.findMany({
    where: {
      isDeleted: false
    }
  });
  return result;
};
var getAllCategoriesAdmin = async () => {
  const result = await prisma.categories.findMany();
  return result;
};
var updateCategories = async (id, data) => {
  const commentData = await prisma.categories.findFirst({
    where: {
      id
    }
  });
  if (!commentData) {
    throw new Error("your provided input for categories is invalid");
  }
  const result = await prisma.categories.update({
    where: {
      id
    },
    data
  });
  return result;
};
var deleteCategories = async (id) => {
  const commentData = await prisma.categories.findFirst({
    where: {
      id
    }
  });
  if (!commentData) {
    throw new Error("your provided input for categories is invalid");
  }
  const result = await prisma.categories.update({
    where: {
      id
    },
    data: {
      isDeleted: true
    }
  });
  return result;
};
var restoreDeletedCategory = async (id) => {
  const deleteData = await prisma.categories.findFirst({
    where: {
      id
    }
  });
  if (!deleteData) {
    throw new Error("you provided input for categories is invalid");
  }
  const result = await prisma.categories.update({
    where: {
      id
    },
    data: {
      isDeleted: false
    }
  });
  return result;
};
var categoriesService = {
  createCategories,
  updateCategories,
  deleteCategories,
  getAllCategory,
  getAllCategoriesAdmin,
  restoreDeletedCategory
};

// src/modules/categories/categories.controller.ts
var createCategories2 = async (req, res) => {
  try {
    const result = await categoriesService.createCategories(req.body);
    return res.status(201).json({
      success: true,
      message: "Categories created successfully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var getAllCategory2 = async (req, res) => {
  try {
    const result = await categoriesService.getAllCategory();
    return res.status(200).json({
      success: true,
      message: "Category retrieved successfully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var updateCategories2 = async (req, res) => {
  try {
    const { categoriesId } = req.params;
    const result = await categoriesService.updateCategories(categoriesId, req.body);
    return res.status(201).json({
      success: true,
      message: "Categories update successfully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var deleteCategories2 = async (req, res) => {
  try {
    const { categoriesId } = req.params;
    const result = await categoriesService.deleteCategories(categoriesId);
    return res.status(201).json({
      success: true,
      message: "categories deleted successfully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: true,
      message: err.message,
      details: err
    });
  }
};
var getAllCategoriesAdmin2 = async (req, res) => {
  try {
    const result = await categoriesService.getAllCategoriesAdmin();
    return res.status(200).json({
      success: true,
      message: "Categories retrieve successfully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var restoreDeletedCategory2 = async (req, res) => {
  try {
    const result = await categoriesService.restoreDeletedCategory(req.params.categoriesId);
    return res.status(200).json({
      success: true,
      message: "Restored the deleted categories successful",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var categoriesController = {
  createCategories: createCategories2,
  updateCategories: updateCategories2,
  deleteCategories: deleteCategories2,
  getAllCategory: getAllCategory2,
  getAllCategoriesAdmin: getAllCategoriesAdmin2,
  restoreDeletedCategory: restoreDeletedCategory2
};

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  //additional setting
  advanced: {
    // crossSubDomainCookies: {
    //   enabled: true,
    // },
  },
  cookie: {
    sameSite: "none",
    // Required for cross-site (Frontend -> Backend)
    secure: true
    // Required when sameSite is "none"
  },
  user: {
    additionalFields: {
      roles: {
        type: "string",
        defaultValue: "Customer",
        required: false
      },
      phone: {
        type: "string",
        required: false
      },
      status: {
        type: "string",
        defaultValue: "activate",
        required: false
      }
    }
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user, ctx) => {
          const role = user.roles;
          if (role === "Customer") {
            await prisma.customerProfile.create({
              data: {
                id: crypto.randomUUID(),
                userId: user.id
              }
            });
          } else if (role === "Provider") {
            const headers = ctx?.headers;
            const getHeader = (key) => {
              if (!headers) return null;
              if (typeof headers.get === "function") return headers.get(key);
              return headers[key] || null;
            };
            await prisma.providerProfile.create({
              data: {
                id: crypto.randomUUID(),
                userId: user.id,
                //extra code
                RestaurantName: getHeader("x-restaurant-name"),
                address: getHeader("x-restaurant-address"),
                city: getHeader("x-restaurant-city")
              }
            });
          }
        }
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false
  },
  trustedOrigins: [
    process.env.BETTER_AUTH_URL,
    "http://localhost:3000",
    "https://foodhub-backend-delta.vercel.app"
  ]
});

// src/middleware/auth.ts
var authMiddleWare = (...roles) => {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({ headers: req.headers });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "unauthorized access!"
        });
      }
      req.user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        roles: session.user.roles,
        emailVerified: session.user.emailVerified
      };
      if (roles.length && !roles.includes(req.user.roles)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden! you don't have permission to access this resources"
        });
      }
      next();
    } catch (err) {
      console.error("middleware error:", err);
      res.status(500).json({
        success: false,
        message: err.message,
        details: err
      });
    }
  };
};
var auth_default = authMiddleWare;

// src/modules/categories/categories.router.ts
var router = express.Router();
router.post("/categories", auth_default("Admin" /* Admin */), categoriesController.createCategories);
router.get("/categories", categoriesController.getAllCategory);
router.get("/categories/admin", categoriesController.getAllCategoriesAdmin);
router.patch("/categories/:categoriesId", auth_default("Admin" /* Admin */), categoriesController.updateCategories);
router.delete("/categories/:categoriesId", auth_default("Admin" /* Admin */), categoriesController.deleteCategories);
router.patch("/categories/restore/:categoriesId", auth_default("Admin" /* Admin */), categoriesController.restoreDeletedCategory);
var categoriesRouter = router;

// src/app.ts
import { toNodeHandler } from "better-auth/node";
import cors from "cors";

// src/modules/auth/auth.route.ts
import express2 from "express";

// src/modules/auth/auth.controller.ts
var singOutController = async (req, res) => {
  try {
    await auth.api.signOut({
      headers: req.headers
    });
    return res.status(200).json({
      success: true,
      message: "Signed out successfully"
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      error: err
    });
  }
};

// src/modules/auth/auth.route.ts
var router2 = express2.Router();
router2.post("/sign-out", singOutController);
var authRouter = router2;

// src/modules/meals/meals.route.ts
import express3 from "express";

// src/modules/meals/meals.service.ts
var createMenu = async (payload, userId) => {
  const { category_id } = payload;
  const categoryData = await prisma.categories.findUniqueOrThrow({
    where: {
      id: category_id
    }
  });
  const result = await prisma.meals.create({
    data: {
      ...payload,
      provider_id: userId,
      profileId: userId,
      cuisine: categoryData.name
    }
  });
  return result;
};
var getAllMenu = async (payload) => {
  const andCondition = [];
  const minPrice = payload.minPrice !== void 0 && !isNaN(Number(payload.minPrice)) ? Number(payload.minPrice) : void 0;
  const maxPrice = payload.maxPrice !== void 0 && !isNaN(Number(payload.maxPrice)) ? Number(payload.maxPrice) : void 0;
  if (payload.search) {
    andCondition.push({
      OR: [
        {
          name: {
            contains: payload.search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (minPrice !== void 0 || maxPrice !== void 0) {
    andCondition.push({
      price: {
        ...minPrice !== void 0 && { gte: minPrice },
        ...maxPrice !== void 0 && { lte: maxPrice }
      }
    });
  }
  if (payload.dietary_tags?.length > 0) {
    andCondition.push({
      dietary_tags: {
        hasEvery: payload.dietary_tags
      }
    });
  }
  if (typeof payload.cuisineString === "string") {
    andCondition.push({ cuisine: payload.cuisineString });
  }
  if (typeof payload.isFeatured === "boolean") {
    andCondition.push({ isFeatured: payload.isFeatured });
  }
  if (typeof payload.isAvailable === "boolean") {
    andCondition.push({ isAvailable: payload.isAvailable });
  }
  const page = payload.page;
  const limit = payload.limit;
  const result = await prisma.meals.findMany({
    take: limit,
    skip: payload.skip,
    where: {
      AND: andCondition
    },
    orderBy: {
      [payload.sortBy]: payload.sortOrder
    },
    include: {
      _count: {
        select: { reviews: true }
      },
      profile: true
    }
  });
  const total = await prisma.meals.count({
    where: {
      AND: andCondition
    }
  });
  return {
    data: result,
    pagination: {
      total,
      page,
      limit,
      totalPage: Math.ceil(total / limit)
    }
  };
};
var getMealById = async (mealId) => {
  const result = await prisma.meals.findUnique({
    where: { id: mealId },
    include: {
      profile: true,
      reviews: {
        include: {
          user: {
            include: {
              providerProfile: true
            }
          }
        }
      }
    }
  });
  return result;
};
var updateMeal = async (mealId, data, isProvider, providerId) => {
  const mealsData = await prisma.meals.findFirstOrThrow({
    where: {
      id: mealId
    },
    select: {
      id: true,
      provider_id: true
    }
  });
  if (!isProvider && mealsData.provider_id !== providerId) {
    throw new Error("You are not the owner of the meals");
  }
  const result = await prisma.meals.update({
    where: {
      id: mealId
    },
    data
  });
  return result;
};
var deleteMeal = async (mealId, user) => {
  const mealData = await prisma.meals.findFirstOrThrow({
    where: {
      id: mealId
    }
  });
  if (user.id !== mealData.provider_id) {
    throw new Error("you are not the owner of the meals");
  }
  if (user.roles !== "Provider" /* Provider */) {
    throw new Error("you are not the owner of the meals");
  }
  const result = await prisma.meals.update({
    where: {
      id: mealId
    },
    data: {
      isDeleted: true
    }
  });
  return result;
};
var getProviderOwnMeal = async (userId, payload) => {
  const page = payload.page;
  const skip = payload.skip;
  const limit = payload.limit;
  const result = await prisma.meals.findMany({
    take: limit,
    skip,
    where: {
      provider_id: userId,
      isDeleted: false
    },
    include: {
      category: true
    }
  });
  const total = await prisma.meals.count({
    where: {
      profileId: userId
    }
  });
  return {
    data: result,
    pagination: {
      total,
      page,
      limit,
      totalPage: Math.ceil(total / limit)
    }
  };
};
var getMinMaxPrice = async () => {
  const aggregation = await prisma.meals.aggregate({
    _min: {
      price: true
    },
    _max: {
      price: true
    }
  });
  return { min: aggregation._min, max: aggregation._max };
};
var menuService = {
  createMenu,
  getAllMenu,
  getMealById,
  updateMeal,
  deleteMeal,
  getMinMaxPrice,
  getProviderOwnMeal
};

// src/helper/paginationSortingHelper.ts
var paginationSortingHelper = (options) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder
  };
};
var paginationSortingHelper_default = paginationSortingHelper;

// src/modules/meals/meals.controller.ts
var createMenu2 = async (req, res) => {
  try {
    const data = req.body;
    if (data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "missing data on req.body"
      });
    }
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const result = await menuService.createMenu(data, user.id);
    return res.status(201).json({
      success: true,
      message: "Menu created success fully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var getAllMenu2 = async (req, res) => {
  try {
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : void 0;
    const isFeatured = req.query.isFeatured === "true" ? true : req.query.isFeatured === "false" ? false : void 0;
    const rawTags = req.query.dietary_tags;
    const dietary_tags = typeof rawTags === "string" ? rawTags.split(",").map((tag) => tag.trim()) : Array.isArray(rawTags) ? rawTags : [];
    ;
    const isAvailable = req.query.isAvailable === "true" ? true : req.query.isAvailable === "false" ? false : void 0;
    const { cuisine } = req.query;
    const cuisineString = typeof cuisine === "string" ? cuisine : void 0;
    const options = paginationSortingHelper_default(req.query);
    const { page, limit, skip, sortBy, sortOrder } = options;
    const result = await menuService.getAllMenu({
      search: searchString,
      minPrice: req.query.minPrice ? Number(req.query.minPrice) : void 0,
      maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : void 0,
      dietary_tags,
      isFeatured,
      isAvailable,
      cuisineString,
      page,
      limit,
      skip,
      sortBy,
      sortOrder
    });
    return res.status(200).json({
      success: true,
      message: "Menu retrieved successfully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var getMealById2 = async (req, res) => {
  try {
    const result = await menuService.getMealById(req.params.mealId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Meals not exist",
        data: {}
      });
    }
    return res.status(200).json({
      success: true,
      message: "Menu retrieved successfully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var updateMeal2 = async (req, res) => {
  try {
    let isProvider = false;
    const user = req.user;
    if (!user) {
      throw new Error("You are not authorized");
    }
    if (user.roles !== "Provider" /* Provider */) {
      throw new Error("You don't have permission to perform this action");
    }
    if (user.roles === "Provider" /* Provider */) {
      isProvider = true;
    }
    const result = await menuService.updateMeal(
      req.params.mealId,
      req.body,
      isProvider,
      user.id
    );
    return res.status(201).json({
      success: true,
      message: "Meal update successfully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var deleteMeal2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("You are not authorized");
    }
    const result = await menuService.deleteMeal(
      req.params.mealId,
      user
    );
    return res.status(201).json({
      success: true,
      message: "Meal delete successfully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var getProviderOwnMeal2 = async (req, res) => {
  try {
    const user = req?.user;
    if (!user) {
      throw new Error("unauthorized");
    }
    const options = paginationSortingHelper_default(req.query);
    const { page, limit, skip } = options;
    const result = await menuService.getProviderOwnMeal(user.id, { page, limit, skip });
    return res.status(200).json({
      success: true,
      message: "provider menu retrieved successfully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var getMinMaxPrice2 = async (req, res) => {
  try {
    const result = await menuService.getMinMaxPrice();
    return res.status(200).json({
      success: true,
      message: "Price retrieved successfully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: true,
      message: err.message,
      details: err
    });
  }
};
var menuController = {
  createMenu: createMenu2,
  getAllMenu: getAllMenu2,
  getMealById: getMealById2,
  updateMeal: updateMeal2,
  deleteMeal: deleteMeal2,
  getMinMaxPrice: getMinMaxPrice2,
  getProviderOwnMeal: getProviderOwnMeal2
};

// src/modules/meals/meals.route.ts
var router3 = express3.Router();
router3.post("/menu", auth_default("Provider" /* Provider */), menuController.createMenu);
router3.get("/menu", menuController.getAllMenu);
router3.get("/menu/:mealId", menuController.getMealById);
router3.get("/my-menu/me", auth_default("Provider" /* Provider */), menuController.getProviderOwnMeal);
router3.patch("/menu/:mealId", auth_default("Provider" /* Provider */), menuController.updateMeal);
router3.delete("/menu/:mealId", auth_default("Provider" /* Provider */), menuController.deleteMeal);
router3.get("/price", menuController.getMinMaxPrice);
var mealsRoute = router3;

// src/modules/order/order.route.ts
import express4 from "express";

// src/modules/order/order.service.ts
var createOrder = async (mealId, customerId, payload) => {
  const mealsData = await prisma.meals.findFirstOrThrow({
    where: { id: mealId },
    select: {
      id: true,
      provider_id: true,
      price: true,
      discountPrice: true,
      name: true
    }
  });
  let totalPrice = 0;
  if (mealsData.discountPrice !== null) {
    totalPrice = payload.quantity * mealsData.discountPrice;
  } else {
    totalPrice = payload.quantity * mealsData.price;
  }
  const orderData = {
    mealId: mealsData.id,
    mealName: mealsData.name,
    price: mealsData.price,
    discountPrice: mealsData.discountPrice,
    quantity: payload.quantity,
    totalPrice,
    deliveryAddress: payload.deliveryAddress || null,
    customer_id: customerId,
    provider_id: mealsData.provider_id
  };
  const result = await prisma.order.create({
    data: orderData
  });
  return result;
};
var getOwnCart = async (customerId) => {
  const result = await prisma.order.findMany({
    where: {
      customer_id: customerId
    }
  });
  return result;
};
var getOrderById = async (orderId, user) => {
  const orderIdNumber = Number(orderId);
  const result = await prisma.order.findUnique({
    where: {
      id: orderIdNumber
    }
  });
  if (!result) {
    throw new Error("Order not found");
  }
  if (user.roles === "Customer" && user.id !== result?.customer_id) {
    throw new Error("You don't have permission to perform this action");
  }
  if (user.roles === "Provider" && user.id !== result?.provider_id) {
    throw new Error("You don't have permission to perform this action");
  }
  return result;
};
var getAllCart = async (customerId, user) => {
  if (user.roles !== "Customer" /* Customer */) {
    throw new Error("You don't have permission to perform this action");
  }
  if (user.id !== customerId) {
    throw new Error("You don't have permission to perform this action");
  }
  const result = await prisma.order.findMany({
    where: {
      customer_id: customerId
    }
  });
  if (result.length === 0) {
    throw new Error("You don't have any order");
  }
  return result;
};
var checkOut = async (orderId, user, deliveryAddress) => {
  const orderData = await prisma.order.findFirstOrThrow({
    where: {
      id: orderId
    }
  });
  if (user.id !== orderData.customer_id) {
    throw new Error("You don't have permission to perform this action");
  }
  if (user.roles !== "Customer" /* Customer */) {
    throw new Error("You don't have permission to perform this action");
  }
  const result = await prisma.order.update({
    where: {
      id: orderData.id
    },
    data: {
      deliveryAddress
    }
  });
  return result;
};
var getAllOrder = async (user) => {
  if (user.roles !== "Provider") {
    throw new Error("You don't have permission to perform this action");
  }
  const result = await prisma.order.findMany({
    where: {
      provider_id: user.id
    }
  });
  if (result.length === 0) {
    throw new Error("No active order found");
  }
  return result;
};
var updateOrderStatus = async (orderId, user, orderStatus) => {
  if (user.roles !== "Provider" /* Provider */) {
    throw new Error("You don't have permission to perform this action");
  }
  const orderData = await prisma.order.findFirstOrThrow({
    where: {
      id: orderId,
      provider_id: user.id
    }
  });
  const result = await prisma.order.update({
    where: {
      id: orderData.id
    },
    data: {
      status: orderStatus
    }
  });
  return result;
};
var getOrderDataByUserIdAndMealId = async (mealId, userId) => {
  const result = await prisma.order.findMany({
    where: {
      mealId,
      customer_id: userId
    }
  });
  return result;
};
var orderService = {
  createOrder,
  getOwnCart,
  getOrderById,
  getAllCart,
  checkOut,
  getAllOrder,
  updateOrderStatus,
  getOrderDataByUserIdAndMealId
};

// src/modules/order/order.controller.ts
var createOrder2 = async (req, res) => {
  try {
    const user = req.user;
    const customer_id = user?.id;
    const result = await orderService.createOrder(req.params.mealId, customer_id, req.body);
    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var getOwnCart2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("you unauthorized.please log in or signup");
    }
    const result = await orderService.getOwnCart(user.id);
    return res.status(200).json({
      success: true,
      message: "Cart retrieved successfully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var getOrderById2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("unauthorized");
    }
    const result = await orderService.getOrderById(req.params.orderId, user);
    return res.status(200).json({
      success: false,
      message: "Your order retrieved successfully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var getAllCart2 = async (req, res) => {
  try {
    const user = req.user;
    const customerId = req.user?.id;
    if (!user) {
      throw new Error("unauthorized");
    }
    const result = await orderService.getAllCart(customerId, user);
    return res.status(200).json({
      success: true,
      message: "Cart retrieved successfully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var checkOut2 = async (req, res) => {
  try {
    const user = req.user;
    const orderId = Number(req.params.orderId);
    if (!user) {
      throw new Error("Unauthorized");
    }
    const result = await orderService.checkOut(orderId, user, req.body.deliveryAddress);
    return res.status(201).json({
      success: true,
      message: "Delivery address set successfully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var getAllOrder2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("unauthorized");
    }
    const result = await orderService.getAllOrder(user);
    return res.status(200).json({
      success: true,
      message: "All order retrieved successfully",
      data: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var updateOrderStatus2 = async (req, res) => {
  try {
    const user = req.user;
    const orderId = Number(req.params.orderId);
    const { status } = req.body;
    if (!user) {
      throw new Error("Unauthorized");
    }
    const result = await orderService.updateOrderStatus(orderId, user, status);
    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var getOrderDataByUserIdAndMealId2 = async (req, res) => {
  try {
    const user = req?.user;
    if (!user) {
      throw new Error("unauthorized");
    }
    const result = await orderService.getOrderDataByUserIdAndMealId(req.params.mealId, user.id);
    return res.status(200).json({
      success: true,
      message: "Order data retrieved",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var orderController = {
  createOrder: createOrder2,
  getOwnCart: getOwnCart2,
  getOrderById: getOrderById2,
  getAllCart: getAllCart2,
  checkOut: checkOut2,
  getAllOrder: getAllOrder2,
  updateOrderStatus: updateOrderStatus2,
  getOrderDataByUserIdAndMealId: getOrderDataByUserIdAndMealId2
};

// src/modules/order/order.route.ts
var router4 = express4.Router();
router4.post("/:mealId", auth_default("Customer" /* Customer */), orderController.createOrder);
router4.get("/myOrder", auth_default("Customer" /* Customer */), orderController.getOwnCart);
router4.get("/details/:orderId", auth_default("Provider" /* Provider */, "Customer" /* Customer */), orderController.getOrderById);
router4.get("/cart", auth_default("Customer" /* Customer */), orderController.getAllCart);
router4.get("/mealData/:mealId", auth_default("Customer" /* Customer */), orderController.getOrderDataByUserIdAndMealId);
router4.patch("/checkout/:orderId", auth_default("Customer" /* Customer */), orderController.checkOut);
router4.get("/getAllOrder", auth_default("Provider" /* Provider */), orderController.getAllOrder);
router4.patch("/update-status/:orderId", auth_default("Provider" /* Provider */), orderController.updateOrderStatus);
var orderRoute = router4;

// src/modules/profile/profile.route.ts
import express5 from "express";

// src/modules/profile/profile.service.ts
var getProfileInfo = async (user) => {
  const profileData = await prisma.user.findFirstOrThrow({
    where: {
      id: user.id
    }
  });
  if (user.id !== profileData.id) {
    throw new Error("You don't have permission to perform this action");
  }
  return profileData;
};
var editProfile = async (userId, payLoad, userData) => {
  const cleanPayload = Object.fromEntries(
    Object.entries(payLoad).filter(([_, v]) => v !== void 0)
  );
  const profileUpdate = await prisma.customerProfile.update({
    where: { userId },
    data: cleanPayload
  });
  if (userData) {
    const cleanUserData = Object.fromEntries(
      Object.entries(userData).filter(([_, v]) => v !== void 0)
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
var getProviderProfile = async (providerId) => {
  const providerProfileData = await prisma.providerProfile.findFirstOrThrow({
    where: {
      id: providerId
    },
    include: {
      user: true,
      meals: true
    }
  });
  return providerProfileData;
};
var profileService = {
  getProfileInfo,
  editProfile,
  getProviderProfile
};

// src/modules/profile/profile.controller.ts
var getProfileInfo2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("unauthorized");
    }
    const result = await profileService.getProfileInfo(user);
    return res.status(200).json({
      success: false,
      message: "Profile data retrieved successfully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var editProfile2 = async (req, res) => {
  try {
    const user = req?.user;
    if (!user) {
      throw new Error("unauthorized");
    }
    const result = await profileService.editProfile(user.id, req.body.data, req.body.name);
    return res.status(201).json({
      success: true,
      message: "Profile updated",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var getProviderProfile2 = async (req, res) => {
  try {
    const result = await profileService.getProviderProfile(req.params.providerId);
    return res.status(200).json({
      success: true,
      message: "Provider data retrieve successfully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var profileController = {
  getProfileInfo: getProfileInfo2,
  editProfile: editProfile2,
  getProviderProfile: getProviderProfile2
};

// src/modules/profile/profile.route.ts
var router5 = express5.Router();
router5.get(
  "/me",
  auth_default("Customer" /* Customer */, "Provider" /* Provider */),
  profileController.getProfileInfo
);
router5.patch("/update", auth_default("Customer" /* Customer */), profileController.editProfile);
router5.get("/provider-profile/:providerId", profileController.getProviderProfile);
var profileRoute = router5;

// src/modules/review/review.route.ts
import express6 from "express";

// src/modules/review/review.service.ts
var createReview = async (payload, user, mealId) => {
  if (user.roles !== "Customer" /* Customer */) {
    throw new Error("you dont have permisson to perform this action");
  }
  const mealData = await prisma.meals.findFirstOrThrow({
    where: {
      id: mealId
    }
  });
  if (!mealData) {
    throw new Error("No order found");
  }
  const reviewData = {
    userId: user.id,
    mealId: mealData.id,
    providerId: mealData.provider_id,
    rating: payload.rating,
    comment: payload.comment
  };
  const result = await prisma.reviews.create({
    data: reviewData
  });
  return result;
};
var getReview = async (mealId, userId) => {
  const result = await prisma.reviews.findMany({
    where: {
      mealId,
      userId
    },
    include: {
      user: true
    }
  });
  return result;
};
var reviewService = {
  createReview,
  getReview
};

// src/modules/review/review.controller.ts
var createReview2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("unauthorized");
    }
    const mealId = req.params.mealId;
    const result = await reviewService.createReview(req.body, user, mealId);
    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: result
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
var getReview2 = async (req, res) => {
  try {
    const mealId = req.params.mealId;
    const user = req.user;
    if (!user) {
      throw new Error("unauthorized");
    }
    const result = await reviewService.getReview(mealId, user.id);
    return res.status(200).json({
      success: true,
      message: "Review retrieved successfully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var reviewController = {
  createReview: createReview2,
  getReview: getReview2
};

// src/modules/review/review.route.ts
var router6 = express6.Router();
router6.post("/:mealId", auth_default("Customer" /* Customer */), reviewController.createReview);
router6.get("/:mealId", auth_default("Customer" /* Customer */, "Provider" /* Provider */), reviewController.getReview);
var reviewRoute = router6;

// src/modules/admin/admin.route.ts
import express7 from "express";

// src/modules/admin/admin.service.ts
var getAllUser = async (user) => {
  if (user.roles !== "Admin" /* Admin */) {
    throw new Error("Unauthorized");
  }
  const result = await prisma.user.findMany({
    where: {
      roles: {
        in: ["Customer" /* Customer */, "Provider" /* Provider */]
      }
    }
  });
  return result;
};
var suspendUser = async (admin, userId) => {
  if (admin.roles !== "Admin" /* Admin */) {
    throw new Error("Unauthorized");
  }
  const result = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      status: "suspend"
    }
  });
  return result;
};
var activeUser = async (admin, userId) => {
  if (admin.roles !== "Admin" /* Admin */) {
    throw new Error("unauthorized");
  }
  const result = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      status: "activate"
    }
  });
  return result;
};
var getAdminStats = async (admin) => {
  if (admin.roles !== "Admin" /* Admin */) {
    throw new Error("unauthorized");
  }
  const totalPreparingOrder = await prisma.order.count({
    where: {
      status: "PREPARING"
    }
  });
  const totalCancelledOrder = await prisma.order.count({
    where: {
      status: "CANCELLED"
    }
  });
  const totalDeliveredOrder = await prisma.order.count({
    where: {
      status: "DELIVERED"
    }
  });
  const totalReadyOrder = await prisma.order.count({
    where: {
      status: "READY"
    }
  });
  const totalUser = await prisma.user.findMany();
  const totalActiveUser = await prisma.user.findMany({
    where: {
      status: "activate"
    }
  });
  const totalDisableUser = await prisma.user.findMany({
    where: {
      status: "suspend"
    }
  });
  const totalMenu = await prisma.meals.count();
  const totalCategories = await prisma.categories.count();
  return {
    totalPreparingOrder,
    totalCancelledOrder,
    totalDeliveredOrder,
    totalReadyOrder,
    totalUser,
    totalActiveUser,
    totalDisableUser,
    totalMenu,
    totalCategories
  };
};
var getAllOrder3 = async (admin) => {
  if (admin?.roles !== "Admin" /* Admin */) {
    throw new Error("unauthorized");
  }
  const result = await prisma.order.findMany();
  return result;
};
var adminService = {
  getAllUser,
  suspendUser,
  activeUser,
  getAdminStats,
  getAllOrder: getAllOrder3
};

// src/modules/admin/admin.controller.ts
var getAllUser2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("Unauthorized");
    }
    const result = await adminService.getAllUser(user);
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var suspendUser2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("Unauthorized");
    }
    const result = await adminService.suspendUser(user, req.params.id);
    return res.status(200).json({
      success: true,
      message: "User suspended successfully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var activeUser2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("unauthorized");
    }
    const result = await adminService.activeUser(user, req.params.userId);
    return res.status(200).json({
      success: true,
      message: "User activated successfully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var getAdminStats2 = async (req, res) => {
  try {
    const user = req?.user;
    if (!user) {
      throw new Error("unauthorized");
    }
    const result = await adminService.getAdminStats(user);
    return res.status(200).json({
      success: true,
      message: "admin stats manage successfully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var getAllOrder4 = async (req, res) => {
  try {
    const user = req?.user;
    if (!user) {
      throw new Error("unauthorized");
    }
    const result = await adminService.getAllOrder(user);
    return res.status(200).json({
      success: true,
      message: "order data retrieved successfully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var adminController = {
  getAllUser: getAllUser2,
  suspendUser: suspendUser2,
  activeUser: activeUser2,
  getAdminStats: getAdminStats2,
  getAllOrder: getAllOrder4
};

// src/modules/admin/admin.route.ts
var router7 = express7.Router();
router7.get("/users", auth_default("Admin" /* Admin */), adminController.getAllUser);
router7.get("/adminStats", auth_default("Admin" /* Admin */), adminController.getAdminStats);
router7.get("/order/", auth_default("Admin" /* Admin */), adminController.getAllOrder);
router7.patch("/suspend/:id", auth_default("Admin" /* Admin */), adminController.suspendUser);
router7.patch("/activate/:userId", auth_default("Admin" /* Admin */), adminController.activeUser);
var adminRoute = router7;

// src/modules/providerStats/providerStats.route.ts
import { Router as Router7 } from "express";

// src/modules/providerStats/providerStats.service.ts
var getProviderStats = async (user) => {
  if (user.roles !== "Provider" /* Provider */) {
    throw new Error("Unauthorized");
  }
  const providerId = user.id;
  const totalMeals = await prisma.meals.count({
    where: {
      provider_id: providerId,
      isDeleted: false
    }
  });
  const totalOrders = await prisma.order.count({
    where: {
      provider_id: providerId
    }
  });
  const totalIncomeResult = await prisma.order.aggregate({
    where: {
      provider_id: providerId,
      status: OrderStatus.READY
    },
    _sum: {
      totalPrice: true
    }
  });
  const totalIncome = totalIncomeResult._sum.totalPrice || 0;
  const totalPreparingOrder = await prisma.order.count({
    where: {
      provider_id: providerId,
      status: OrderStatus.PREPARING
    }
  });
  const totalReadyOrder = await prisma.order.count({
    where: {
      provider_id: providerId,
      status: OrderStatus.READY
    }
  });
  const totalCancelledOrder = await prisma.order.count({
    where: {
      provider_id: providerId,
      status: OrderStatus.CANCELLED
    }
  });
  const totalReview = await prisma.reviews.count({
    where: {
      providerId
    }
  });
  return {
    totalMeals,
    totalOrders,
    totalIncome,
    totalPreparingOrder,
    totalReadyOrder,
    totalCancelledOrder,
    totalReview
  };
};
var getProviderInformation = async (providerId) => {
  const res = await prisma.user.findFirst({
    where: {
      id: providerId,
      roles: "Provider" /* Provider */
    },
    include: {
      providerProfile: true,
      meals: true
    }
  });
  return res;
};
var providerStatsService = {
  getProviderStats,
  getProviderInformation
};

// src/modules/providerStats/providerStats.controller.ts
var getProviderStats2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("Unauthorized");
    }
    const result = await providerStatsService.getProviderStats(user);
    res.status(200).json({
      success: true,
      message: "Provider stats retrieved successfully",
      data: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var getProviderInformation2 = async (req, res) => {
  try {
    const result = await providerStatsService.getProviderInformation(req.params.providerId);
    return res.status(200).json({
      success: true,
      message: "Provider Data retrieved successfully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var providerStatsController = {
  getProviderStats: getProviderStats2,
  getProviderInformation: getProviderInformation2
};

// src/modules/providerStats/providerStats.route.ts
var router8 = Router7();
router8.get("/", auth_default("Provider" /* Provider */), providerStatsController.getProviderStats);
router8.get("/:providerId", providerStatsController.getProviderInformation);
var providerStatsRoute = router8;

// src/modules/adminStats/adminStats.route.ts
import express8 from "express";

// src/modules/adminStats/adminStats.service.ts
var getAdminStats3 = async (user) => {
  if (user.roles !== "Admin" /* Admin */) {
    throw new Error("unauthorized");
  }
  const totalUser = await prisma.user.count();
  const totalProvider = await prisma.user.count({
    where: {
      roles: "Provider" /* Provider */
    }
  });
  const totalCustomer = await prisma.user.count({
    where: {
      roles: "Customer" /* Customer */
    }
  });
  const totalOrder = await prisma.order.count();
  const totalPreparingOrder = await prisma.order.count({
    where: {
      status: "PREPARING"
    }
  });
  const totalCancelledOrder = await prisma.order.count({
    where: {
      status: "CANCELLED"
    }
  });
  const totalCompleteOrder = await prisma.order.count({
    where: {
      status: "READY"
    }
  });
  const totalRevenue = await prisma.order.aggregate({
    _sum: {
      totalPrice: true
    }
  });
  return {
    totalUser,
    totalProvider,
    totalCustomer,
    totalOrder,
    totalPreparingOrder,
    totalCancelledOrder,
    totalCompleteOrder,
    totalRevenue
  };
};
var AdminStatsService = {
  getAdminStats: getAdminStats3
};

// src/modules/adminStats/adminStats.controller.ts
var adminStats = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("unauthorized");
    }
    const result = await AdminStatsService.getAdminStats(user);
    return res.status(200).json({
      success: true,
      message: "Admin stats fetched successfully",
      data: result
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
      details: err
    });
  }
};
var adminStatsController = {
  adminStats
};

// src/modules/adminStats/adminStats.route.ts
var router9 = express8.Router();
router9.get("/", auth_default("Admin" /* Admin */), adminStatsController.adminStats);
var adminStatsRoute = router9;

// src/app.ts
var app = express9();
app.use(express9.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      process.env.BETTER_AUTH_URL,
      "https://foodhub-backend-delta.vercel.app"
    ],
    credentials: true
  })
);
app.use("/api/auth", authRouter);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/api/provider", mealsRoute);
app.use("/api/order", orderRoute);
app.use("/api/review", reviewRoute);
app.use("/api/access/", adminRoute);
app.use("/api/provider-stats", providerStatsRoute);
app.use("/api/admin-stats", adminStatsRoute);
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "hello world"
  });
});
app.use("/api/profile", profileRoute);
app.use("/api/admin", categoriesRouter);
app.use(notFound);
var app_default = app;

// src/index.ts
var index_default = app_default;
export {
  index_default as default
};
