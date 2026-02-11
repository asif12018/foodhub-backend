
import  express, { Application, Request, Response }   from 'express';
import { notFound } from './middleware/notFound';
import { categoriesRouter } from './modules/categories/categories.router';
import {toNodeHandler} from "better-auth/node"
import cors from "cors";
import { auth } from './lib/auth';
import { authRouter } from './modules/auth/auth.route';
import { mealsRoute } from './modules/meals/meals.route';
import authMiddleWare, { UserRole } from './middleware/auth';
import { orderRoute } from './modules/order/order.route';
import { profileController } from './modules/profile/profile.controller';
import { profileRoute } from './modules/profile/profile.route';









const app:Application = express();

app.use(express.json())

app.use(
    cors({
        origin: [
            process.env.BETTER_AUTH_URL!
        ],
        credentials: true,
    })
);


app.use("/api/auth", authRouter)
app.all("/api/auth/*splat", toNodeHandler(auth))

app.use("/provider", mealsRoute);

app.use("/order", orderRoute);

app.get("/", (req:Request, res:Response)=>{
    res.status(200).json({
        success: true,
        message:"hello world"
    })
});

app.use("/profile", profileRoute);

app.use("/admin", categoriesRouter)


app.use(notFound);






export default app