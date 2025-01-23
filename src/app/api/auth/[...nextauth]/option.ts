import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '@/lib/db';

export const next_Options : NextAuthOptions = {
    providers:[
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID || "",
            clientSecret : process.env.GOOGLE_CLIENT_SECRET || "",
        })
    ],
    callbacks: {
      async signIn(params){
        if(!params.user.email){
          return false;
        }
        try {
          await prisma.user.create({
            data:{
              email: params.user.email,
              provider:"GOOGLE"
            }
          })
        } catch (e) {
          console.log(e);
          return false;
        }
        return true;
      }
    }
}