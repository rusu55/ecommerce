import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { redirect } from "next/dist/server/api-utils";

export const authOptions = {
   providers: [
    CredentialsProvider({
        name: "credentials",
        credentials: {
            email: {label: 'Email', type: 'text'},
            password: {label: 'Password', type: 'password'}
        },

       async authorize(credentials, req){
            if(!credentials?.email || !credentials?.password){
                //return new NextResponse('Invalid Credentials', {status: 400})
                throw new Error("Invalid Credentials")
            }
             await connectToDB();
            const user = await User.findOne({ email: credentials.email});

            if(!user || !user?.password){
                throw new Error("Invalid Credentials")
              // return new NextResponse('Invalid Credentials', {status: 401})
            }

            const correctPassword = await bcrypt.compare(
                credentials.password,
                user.password
            )
            
            if(!correctPassword){
                //return new NextResponse('Invalid Credentials', {status: 401})
                throw new Error("Invalid Credentials")
            }          
            return user
            //return NextResponse.json(user)
       }
    })
   ],
   callbacks:{
    async signIn({profile, credentials}) {
        
        return true
      },
    //async redirect({url, baseUrl}){
    //    console.log('url', url);
    //    console.log('baseUrl', baseUrl);
        //return url.startsWith(baseUrl) ? url : baseUrl + '/employees/';
    //    return baseUrl + '/employees/';
   // },
   },
   secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}