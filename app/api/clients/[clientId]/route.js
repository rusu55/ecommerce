import mongoose from "mongoose";
import { connectToDB } from "@/utils/database";

import Client from '@/models/client';
import Project from "@/models/project";
import Service from "@/models/service";

export const GET = async  (req, {params}) =>{
    
    if(!params.clientId){
        return new Response("Client ID is required", {status: 400});        
    }

    await connectToDB()    
    const client = await Client.findById(params.clientId).populate("services project")   

    if(!client){
        return new Response("Client with ID not found!", {status: 400});
    }

    return new Response(JSON.stringify(client), {status:201})
}

export const PATCH = async (req, {params}) =>{
    const {name, address, email, phone, weddingDate, services, value} = await req.json(); 
    await connectToDB();

    const existingClient = await Client.findById(params.clientId);
    console.log(existingClient)
    const existingServices = await Service.findById(existingClient.services._id);

    if(!existingClient) return new Response("Prompt not Found!", {status: 404});

    
    existingClient.name = name;
    existingClient.address = address;
    existingClient.email = email;
    existingClient.phone = phone;
    existingClient.weddingDate = weddingDate;
    
    existingServices.photography = services

    await existingClient.save()
    await existingServices.save()

    return new Response(JSON.stringify(existingClient), {status:201})
}

export const DELETE =  async (req, {params}) =>{    
    if(!params.clientId){
        return new Response("Client ID is required", {status: 400});        
    }
    
   await connectToDB()
   const client = await Client.findById(params.clientId)
    
    if(!client){
        return new Response("Client with ID not found!", {status: 400});
    }

    
    const session = await mongoose.startSession();
          session.startTransaction();
  
    try{
        await Client.findByIdAndDelete(params.clientId).session(session)
        await Service.findByIdAndDelete(client.services._id).session(session)        
        await Project.findByIdAndDelete(client.project._id).session(session)

        await session.commitTransaction();
              session.endSession();
       
        return new Response("Client ID was deleted!", {status: 201});
    }
    catch(error){
        return new Response(error, {status: 400});
    }
    
}