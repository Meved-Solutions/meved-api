import express from "express";
import cors from "cors";
import dotenv from 'dotenv'

import connectDB from "./mongodb/index.js";

import adminAuthRouter from './routers/adminAuth.router.js';
import adminRouter from './routers/admin.router.js';
import applicantRouter from './routers/applicant.router.js';
import applicationRouter from './routers/application.router.js';
import domainRouter from './routers/domain.router.js';
import postingRouter from './routers/posting.router.js';
import orgRouter from './routers/organization.router.js'

const app = express();
app.use(cors({
    origin: function (origin, callback) {
      const allowedOrigins = ['http://localhost:5173'];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true
  }));
app.use(express.json());
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}));


app.use('/api/adminAuth', adminAuthRouter);
app.use('/api/admin', adminRouter);
app.use('/api/applicant', applicantRouter);
app.use('/api/application', applicationRouter);
app.use('/api/domain', domainRouter);
app.use('/api/posting', postingRouter);
app.use('/api/org', orgRouter);

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