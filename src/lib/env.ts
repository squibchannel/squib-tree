import { z } from "zod";

const envSchema = z.object({
  AUTH_SECRET: z.string(),

  // supabase
  SUPABASE_URL: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string(),
  SUPABASE_JWT_SECRET: z.string(),

  // twitch
  AUTH_TWITCH_ID: z.string(),
  AUTH_TWITCH_SECRET: z.string(),

  // hashgen
  HASHGEN_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
