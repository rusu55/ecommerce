import mongoose from "mongoose";
import { connectToDB } from "@/utils/database";
import Client from '@/models/client';
import Project from "@/models/project";
import Service from "@/models/service";


export const GET = async () =>{
    return new Response('User with this email already registerd', {status:201})
}

export const POST = async (request) =>{
    const {name, address, email, phone, weddingDate, services, value} = await request.json(); 
   
        await connectToDB();
        const client = await Client.findOne({email: email});

        if(client){
            return new Response('User with this email already registerd', {status:401})
        };

        // initialize a session
        const session = await mongoose.startSession();
        //start transaction
        session.startTransaction();

        try{

            const newProject = await Project.create([{_id: new mongoose.Types.ObjectId()}], {session: session});
           
            const newService = await Service.create([{_id: new mongoose.Types.ObjectId(), photography: services}],{session: session})
            const newClient = await Client.create([{name: name, email: email, address: address, phone: phone, value: value, weddingDate: weddingDate,  project: newProject[0]._id, services: newService[0]._id }], {session: session});        
         

            await session.commitTransaction();
            session.endSession();

            return new Response(JSON.stringify(newClient), {status: 201});
        }
        catch(error){
            await session.abortTransaction();
            session.endSession();
            return new Response(error, {status:401})
        }     
    
}