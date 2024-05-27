import { createClient } from "@supabase/supabase-js";
import { env } from "../env";
import { Database } from "@/types/supabase";

export function createAdminClient() {
  return createClient<Database>(
    env.SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY,
    {
      db: {
        schema: "next_auth",
      },
    }
  );
}

export const supabaseAdmin = createAdminClient();
