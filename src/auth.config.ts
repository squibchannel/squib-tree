import type { NextAuthConfig } from "next-auth";
import { env } from "./lib/env";
import jwt from "jsonwebtoken";
import TwitchProvider from "next-auth/providers/twitch";
import { TWITCH_SCOPES } from "./lib/const";
import { SupabaseAdapter } from "@auth/supabase-adapter";

const {
  AUTH_TWITCH_SECRET,
  AUTH_TWITCH_ID,
  SUPABASE_SERVICE_ROLE_KEY,
  SUPABASE_URL,
  SUPABASE_JWT_SECRET,
} = env;

export default {
  providers: [
    TwitchProvider({
      clientId: AUTH_TWITCH_ID,
      clientSecret: AUTH_TWITCH_SECRET,
      authorization: {
        params: {
          scope: TWITCH_SCOPES.join(" "),
        },
      },
    }),
  ],

  adapter: SupabaseAdapter({
    url: SUPABASE_URL,
    secret: SUPABASE_SERVICE_ROLE_KEY,
  }),
} satisfies NextAuthConfig;
