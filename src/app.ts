import express, { Request, Response } from 'express';
const app = express();
import globalErrorHandler from './middlewares/globalErrorHandler';
import NotFound from './middlewares/NotFound';
import router from './router/routes';
import cookieParser from "cookie-parser";
app.use(express.json());
app.use(cookieParser());


//test route
const test=async(req:Request,res:Response)=>{
  const sayHi="Hi~! Jakuan";
  res.send(sayHi);
 
}

app.get('/', test);

//application routes
app.use('/api',router);

//
//gloabal err handler
app.use(globalErrorHandler)

//Not Found Route
app.use(NotFound);


export default app;
