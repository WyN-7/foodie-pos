import NextAuth, { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGlE_CLIENT_ID!,
      clientSecret: process.env.GOOGlE_CLIENT_SECRET!,
    }),
  ],
};

export default NextAuth(authOptions);
