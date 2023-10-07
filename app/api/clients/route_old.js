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

    try{
        await connectToDB();
        const client = await Client.findOne({email: email});

        if(client){
            return new Response('User with this email already registerd', {status:401})
        };
        const newClient = await Client.create({ name: name, email: email, address: address, phone: phone, weddingDate: weddingDate, value: value});        
        const newProject = await Project.create({clientId: newClient._id});
        const newService = await Service.create({clientId: newClient._id, photography: services});
        /*
        const session = await Client.startSession();
              

        try{
            session.startTransaction();
            
            const newClient = await Client.create({_id: new mongoose.Types.ObjectId, name: name, email: email, address: address, phone: phone, weddingDate: weddingDate, value: value}, {session})
            //console.log(newClient._id)
            //const newProject = await Project.create({clientId: newClient._id});
           // const newService = await Service.create({clientId: newClient._id, photography: services});
            
            await session.commitTransaction();
            session.endSession();
            return new Response('New Client Added', {status:201})

        }
        catch(error){
             await session.abortTransaction();
             session.endSession();
            throw error; 
        }
       

*/
        return new Response(JSON.stringify(newClient), {status: 201});
    }catch(error){
        return new Response(error, {status:401})
    }
    
}