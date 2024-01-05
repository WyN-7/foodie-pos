import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGlE_CLIENT_ID!,
      clientSecret: process.env.GOOGlE_CLIENT_SECRET!,
    }),
  ],
};

export default NextAuth(authOptions);
