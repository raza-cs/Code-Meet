//const express = require("express");
import express from "express";
import path from "path";

import {ENV} from "./lib/env.js";

const app = express();

const __dirname = path.resolve();

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


app.listen(ENV.PORT, () => console.log(`Server running on port ${ENV.PORT}`));
