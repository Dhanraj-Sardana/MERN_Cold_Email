import express from "express";
import signin from '../controllers/signin.js'
import authCheck from "../controllers/authCheck.js";
import login from "../controllers/login.js";
import logout from "../controllers/logout.js";

const authRouter=express.Router();

authRouter.post('/signin',signin);
authRouter.post('/login',login);
authRouter.get('/check',authCheck);
authRouter.post('/logout',logout);
export default authRouter;