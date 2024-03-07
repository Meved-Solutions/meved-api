import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
dotenv.config();

import connectDB from "./mongodb/index.js";

import adminAuthRouter from './routers/adminAuth.router.js';
import adminRouter from './routers/admin.router.js';
import applicantRouter from './routers/applicant.router.js';
import applicationRouter from './routers/application.router.js';
import domainRouter from './routers/domain.router.js';
import postingRouter from './routers/posting.router.js';

const app=express();
app.use(cors());
app.use(express.json());

app.use('/adminAuth', adminAuthRouter);
app.use('/admin', adminRouter);
app.use('/applicant', applicantRouter);
app.use('/application', applicationRouter);
app.use('/domain', domainRouter);
app.use('/posting', postingRouter);

app.get("/", (req, res) => {
    res.send({message: "Hello World"});
});

const startServer=async()=>{
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, ()=>console.log("Server started on http://localhost:8080"));
    } catch(error){
        console.log(error);
    }
}

startServer();