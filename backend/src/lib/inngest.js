import {Inngest} from "inngest";
import {connectDB} from "./db.js";
import User from "../models/Users.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";
export const inngest = new Inngest({id : "code-meet"});

const syncUser = inngest.createFunction(
    {id : "sync-user"},
    {event:"clerk/user.created"},
    async({event})=>{
        await connectDB()

        const {id,email_addresses,first_name,last_name,image_url} = event.data;
        const newUser = {
            clerkId : id,
            email : email_addresses[0]?.email_address,
            name : `${first_name|| ""} ${last_name|| ""}`,
            profileImage : image_url,
        }

        const createdUser = await User.create(newUser);
        console.log("Mongo user created:", createdUser);

        
        await upsertStreamUser({
            id : newUser.clerkId.toString(),
            name : newUser.name,
            image : newUser.profileImage,
        });
        console.log("Stream user created");
    }
) 

const deletUserFromDb = inngest.createFunction(
    {id : "delet-user-from-db"},
    {event:"clerk/user.deleted"},
    async({event})=>{
        await connectDB()

        const {id} = event.data;
        await User.deleteOne({clerkId : id});

        await deleteStreamUser(id.toString());
    }
) 

export const functions = [syncUser,deletUserFromDb]
