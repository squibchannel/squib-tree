"use server";

import { createAdminClient } from "@/lib/supabase/adminClient";
import { createClient } from "@/lib/supabase/serverSide";
import { Session } from "next-auth";
import { auth } from "@/auth";

export async function stageSupabaseClient() {
  const session = await auth();
  const client = createClient(session?.supabaseAccessToken!);
  return client;
}

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

export async function createSocialsTable(userId: string) {
  const supabaseClient = await stageSupabaseClient();

  const createdAt = new Date().toISOString();
  const { error } = await supabaseClient
    .from("socials")
    .insert([{ user_id: userId, created_at: createdAt }]);

  if (error) {
    console.error("Error creating socials table:", error);
    return null;
  }
}

export async function supabaseGetUserSocials(userId: string) {
  const supabaseClient = await stageSupabaseClient();

  const { data, error } = await supabaseClient
    .from("socials")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.log(error);
    throw new Error("Access token or user ID is missing");
  }

  return data;
}
