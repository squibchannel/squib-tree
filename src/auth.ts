import NextAuth from "next-auth";
import TwitchProvider from "next-auth/providers/twitch";
import { SupabaseAdapter } from "@auth/supabase-adapter";
// import jwt from "jsonwebtoken";

// At some point I will need to handle jwt while authenticating

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    TwitchProvider({
      clientId: process.env.AUTH_TWITCH_ID,
      clientSecret: process.env.AUTH_TWITCH_SECRET,

      authorization: {
        params: { scope: "openid user:read:email" },
      },
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),

  // Handle whatever happens when said function is called, ie session or signIn
  callbacks: {
    async session({ session, user }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET;
      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          role: "authenticated",
        };
        // session.supabaseAccessToken = jwt.sign(payload, signingSecret);
      }
      return session;
    },
  },

  events: {
    signIn: ({ user }) => {
      console.log(user);
    },
  },
});
