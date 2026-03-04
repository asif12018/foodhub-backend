
import  express, { Application, Request, Response }   from 'express';
import { notFound } from './middleware/notFound';
import { categoriesRouter } from './modules/categories/categories.router';
import {toNodeHandler} from "better-auth/node"
import cors from "cors";
import { auth } from './lib/auth';
import { authRouter } from './modules/auth/auth.route';
import { mealsRoute } from './modules/meals/meals.route';
import { orderRoute } from './modules/order/order.route';
import { profileRoute } from './modules/profile/profile.route';
import { reviewRoute } from './modules/review/review.route';
import { adminRoute } from './modules/admin/admin.route';
import { providerStatsRoute } from './modules/providerStats/providerStats.route';
import { adminStatsRoute } from './modules/adminStats/adminStats.route';
import { userStatusUser } from './modules/userProfileStatus/userProfileStatus.route';









const app:Application = express();

app.use(express.json())

app.use(
    cors({
        origin: [
            "http://localhost:3000", 
            process.env.BETTER_AUTH_URL!,
            "https://foodhub-backend-delta.vercel.app",
            "https://foodhub-frontend-omega.vercel.app"
        ],
        credentials: true,
    })
);




app.use("/api/auth", authRouter)
app.all("/api/auth/*splat", toNodeHandler(auth))

app.use("/api/provider", mealsRoute);

app.use("/api/order", orderRoute);


app.use("/api/review", reviewRoute);


app.use("/api/access/", adminRoute);
app.use("/api/provider-stats", providerStatsRoute);
app.use("/api/admin-stats", adminStatsRoute);
app.get("/", (req:Request, res:Response)=>{
    res.status(200).json({
        success: true,
        message:"hello world"
    })
});

app.use("/api/profile", profileRoute);

app.use("/api/admin", categoriesRouter);

app.use("/api/userStatus", userStatusUser);


app.use(notFound);






export default app