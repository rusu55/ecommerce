import bcrypt from 'bcrypt';

import { connectToDB } from '@/utils/database';
import User from '@/models/user';

export const POST = async (request) =>{
    const {email, name, password} = await request.json();

    try{
        await connectToDB();
        const user =  await User.findOne({email: email});
        
        if(user){
            return new Response('User with this email already registerd', {status:401})
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({ email: email, name: name, password: hashedPassword});

        return new Response(JSON.stringify(newUser), {status: 201});
    }
    catch(error){
        return new Response(error, {status: 500});
    }
}