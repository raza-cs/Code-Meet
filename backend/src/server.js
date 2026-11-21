//const express = require("express");
import express from "express";
import path from "path";
import cors from "cors";
import {serve} from "inngest/express";

import {ENV} from "./lib/env.js";
import { connectDB } from "./lib/db.js";

const app = express();

const __dirname = path.resolve();

//middleware
app.use(express.json());
//credentials:true meaning?? =>server allow browser to include cookies on request 
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))

app.use("/api/inngest", serve({client: inngest, functions}))

app.get("/ser",(req,res)=>{
    res.status(200).json({message:"success from server"});
});

app.get("/books",(req,res)=>{
    res.status(200).json({message:"this is books endpoint"});
});

// MAKE OUR APP READY FOR DIPLOYMENT
if(ENV.NODE_ENV == "production"){
    app.use (express.static(path.join(__dirname,"../frontend/dist")));

    app.get("/{*any}",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/dist/index.html"));
});
}




const startServer = async ()=>{
    try{
        await connectDB();
        app.listen(ENV.PORT, () =>console.log(`Server running on port ${ENV.PORT}`));
    }catch(error){
        console.log("error starting the server",error)
    }
};

startServer();
