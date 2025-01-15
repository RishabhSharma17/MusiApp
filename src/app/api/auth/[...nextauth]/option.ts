import { NextAuthOptions } from 'next-auth';
import CredentailsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const next_Options : NextAuthOptions = {
    providers:[
        CredentailsProvider({
            id: "credentials",
            name: 'Credentials',
            credentials:{
                username: { label: 'Username or Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentails:any) : Promise<any> {
                // console.log("Signin button");
                // await dbConnect();
                // try{
                //     const user = await UserModel.findOne({
                //         "$or":[
                //             {email: credentails.identifier},
                //             {username: credentails.identifier}
                //         ]
                //     });

                //     if(!user){
                //         throw new Error("User not found");
                //     }

                //     const ispassword = await bcrypt.compare(credentails.password,user.password);

                //     if(!ispassword){
                //         throw new Error("Invalid password");
                //     }

                //     // return user;
                // }
                // catch(err:any){
                //     throw new Error(err);
                // }
            }
        }),
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID || "",
            clientSecret : process.env.GOOGLE_CLIENT_SECRET || "",
        })
    ],
    // callbacks: {
    //     async jwt({ token, user }) {
    //       if (user) {
    //         token._id = user._id?.toString();
    //         token.isVerified = user.isVerified;
    //         token.isAcceptingMessages = user.isAccepting;
    //         token.username = user.username;
    //       }
    //       return token;
    //     },
    //     async session({ session, token }) {
    //       if (token) {
    //         session.user._id = token._id;
    //         session.user.isVerified = token.isVerified;
    //         session.user.isAcceptingMessages = token.isAcceptingMessages;
    //         session.user.username = token.username;
    //       }
    //       return session;
    //     },
    // },
    //if it is defined then it will go to this route
    // pages:{
    //     signIn:'/sign-in',
    // },
    // session:{
    //     strategy: 'jwt',
    // },
    // secret:process.env.NEXTAUTH_SECRET || ""
}