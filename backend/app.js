import dotenv from 'dotenv';
import express from 'express';
dotenv.config();
const app=express();
const PORT=process.env.PORT;
 app.listen(PORT,(err)=>{
if (err) console.error(`error in connection to PORT ${PORT} error : ${err}`);
console.log(`Server connected at PORT : ${PORT}`);

 })