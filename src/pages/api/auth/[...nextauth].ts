import NextAuth, { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
};

export default NextAuth(authOptions);
