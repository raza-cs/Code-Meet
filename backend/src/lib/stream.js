import {StreamChat} from "stream-chat";
import {ENV} from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SCREATE;

if (!apiKey || !apiSecret){
    console.error("Stream_API_KEY or STREAM_API_SECRET is missing ");
};

export const chatClient = StreamChat.getInstance(apiKey,apiSecret);

export const upsertStreamUser = async(userData) => {
    try{
        await chatClient.upsertUser(userData);
        console.log("stream userupserted  :",userData);
    }catch(error){
        console.log("error upserting stream : ", error);
    }
};

export const deleteStreamUser = async(userId) => {
    try{
        await chatClient.deleteUsers(userId);
        console.log("stream user deleted : ",userId);
    }catch(error){
        console.log("error deleting stream : ", error);
    }
};



//todo sth