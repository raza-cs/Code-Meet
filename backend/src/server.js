//const express = require("express");
import express from "express";
import {ENV} from "./lib/env.js";

const app = express();

app.get("/",(req,res)=>{
    res.status(200).json({message:"success from server"});
});

const PORT = ENV.PORT || 5000;  
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
