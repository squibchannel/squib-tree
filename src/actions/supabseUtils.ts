import { createAdminClient } from "@/lib/supabase/adminClient";
import { Session } from "next-auth";

export async function supabaseAdminConnectUser(
  session: Session | null
): Promise<any> {
  if (!session || !session.user || !session.user.id) {
    throw new Error("Authentication failed");
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("userId", session.user.id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Access token or user ID is missing");
  }

  return data;
}
