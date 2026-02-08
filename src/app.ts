
import  express, { Application, Request, Response }   from 'express';
import { notFound } from './middleware/notFound';









const app:Application = express();



app.get("/", (req:Request, res:Response)=>{
    res.status(200).json({
        success: true,
        message:"hello world"
    })
});


app.use(notFound);






export default app