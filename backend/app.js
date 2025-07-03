import dotenv from 'dotenv';
import express, { urlencoded } from 'express';
import connectDB from './config/db.js';
dotenv.config();
import authRouter from './routes/authRoute.js';
import apiRouter from './routes/apiRoutes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
connectDB();

const app=express();


app.use(cors({origin:'http://localhost:5173',credentials:true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use('/auth',authRouter);
app.use('/api',apiRouter);

const PORT=process.env.PORT;

 app.listen(PORT,(err)=>{
if (err) console.error(`error in connection to PORT ${PORT} error : ${err}`);
console.log(`Server connected at PORT : ${PORT}`);

 })