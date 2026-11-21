import mongoose from 'mongoose';

import {ENV} from "./env.js";

import dns from "dns"
dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

export const connectDB = async()=>{
    try{
        if(!ENV.DB_URL){
            throw new Error("DB_URL is not defiend in environment variables ");
        };
        const conn = await mongoose.connect(ENV.DB_URL);
        console.log("connected to mongoDb",conn.connection.host);
    }catch(error){
        console.log("Error connecting to mongoDb",error);
        process.exit(1);//0 success 1 failed 
    }
};
