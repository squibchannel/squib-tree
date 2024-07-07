"use server";

import { createAdminClient } from "@/lib/supabase/adminClient";
import { supabaseAdmin } from "@/lib/supabase/adminClient";
import { createClient } from "@/lib/supabase/serverSide";
import { createServerClient } from "@supabase/ssr";
import { Session } from "next-auth";

import { auth } from "@/auth";

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
  // console.log("inside admin client request", data);
  return data;
}

//TODO: So we had to use the "createClient" function becuase the admin client
// only works for the accounts table for some reason

// We will want to check for the user's socials and have an optional param
// taht will say hey, if an empty array (or false) then if true/false create or not
// the table

export async function supabaseGetUserSocials(userId: string) {
  const session = await auth();

  const supabase = createAdminClient();
  const supersuperbase = createClient(session?.supabaseAccessToken!);
  const { data, error } = await supersuperbase
    .from("socials")
    .select("*")
    .eq("id", userId);

  console.log(data);
  if (error) {
    console.log(error);
    throw new Error("Access token or user ID is missing");
  }

  return data;
}
