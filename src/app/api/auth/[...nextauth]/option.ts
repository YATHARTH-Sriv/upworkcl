import dbconnect from "@/lib/db/connect";
import UserModel from "@/lib/db/model/user.model";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// src/app/api/auth/[...nextauth]/option.ts
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        await dbconnect();
        const dbUser = await UserModel.findOne({ email: user.email });
        
        if (!dbUser) {
          const newUser = await UserModel.create({
            name: user.name,
            email: user.email,
            image: user.image,
          });
          token.id = newUser._id.toString();
        } else {
          token.id = dbUser._id.toString();
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};