import NextAuth, { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGlE_CLIENT_ID!,
      clientSecret: process.env.GOOGlE_CLIENT_SECRET!,
    }),
  ],
};

export default NextAuth(authOptions);
