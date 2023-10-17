import mongoose from "mongoose";
import { format } from "date-fns";
import { connectToDB } from "@/utils/database";
import Client from '@/models/client';
import Project from "@/models/project";
import Service from "@/models/service";
import DateRange from "@/models/dateRange";
import Payment from "@/models/payment";

export const GET = async () =>{
    return new Response('User with this email already registerd', {status:201})
}

export const POST = async (request) =>{
    const {firstName, lastName, address, email, phone, weddingDate, services, value} = await request.json(); 
   
        await connectToDB();
        const client = await Client.findOne({email: email});
        const existingYear = await DateRange.findOne({years: format(new Date(weddingDate), 'yyyy')})
        
        if(client){
            return new Response('User with this email already registerd', {status:401})
        };

        // initialize a session
        const session = await mongoose.startSession();
        //start transaction
        session.startTransaction();
        
        try{

            if(!existingYear){
                const newYear = await DateRange.create([{years: format(new Date(weddingDate), 'yyyy')}], {session: session})
            }

            const newProject = await Project.create([{_id: new mongoose.Types.ObjectId()}], {session: session});           
            const newService = await Service.create([{_id: new mongoose.Types.ObjectId(), services: services}],{session: session})
            const newPayment = await Payment.create([{_id: new mongoose.Types.ObjectId(), contractValue: value}], {session: session})
            const newClient = await Client.create([{firstName: firstName, lastName: lastName, email: email, address: address, phone: phone, weddingDate: format(new Date(weddingDate), "MM/dd/yyyy"),  project: newProject[0]._id, services: newService[0]._id,  value: newPayment[0]._id }], {session: session});        
         

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