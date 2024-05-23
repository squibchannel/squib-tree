import NextAuth from "next-auth";
import TwitchProvider from "next-auth/providers/twitch";

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

  events: {
    signIn: ({ isNewUser }) => {
      console.log(isNewUser);
    },
  },
});
