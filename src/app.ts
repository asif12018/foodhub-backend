
import  express, { Application, Request, Response }   from 'express';
import { notFound } from './middleware/notFound';
import { categoriesRouter } from './modules/categories/categories.router';









const app:Application = express();

app.use(express.json())

app.get("/", (req:Request, res:Response)=>{
    res.status(200).json({
        success: true,
        message:"hello world"
    })
});

app.use("/admin", categoriesRouter)


app.use(notFound);






export default app