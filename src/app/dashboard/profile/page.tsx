import React from "react";
import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/serverSide";

async function ProfilePage() {
  const session = await auth();

  const supabase = createClient(session?.supabaseAccessToken as string);

  const { data, error } = await supabase.from("users").select("name");

  return <div>{JSON.stringify(data)}</div>;
}

export default ProfilePage;
