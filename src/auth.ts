import jwt from "jsonwebtoken";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { env } from "./lib/env";

const { SUPABASE_JWT_SECRET } = env;

/*
  Row Level Security Notes:
  - Our session gets called and a token is assigned
  - This token allows us to only see our own data
*/

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  // debug: true,
  callbacks: {
    // async jwt({ token }) {
    //   console.log("jwt callback starting..");
    //   return token;
    // },

    async session({ session, user }) {
      const signingSecret = SUPABASE_JWT_SECRET;
      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: "authenticated",
        };
        session.supabaseAccessToken = jwt.sign(payload, signingSecret);
      }

      return session;
    },
  },
});
