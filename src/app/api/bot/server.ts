import { supabaseAdminConnectUser } from "@/actions/supabaseUtils";
import tmi from "tmi.js";
import { RefreshToken } from "@/lib/axios/twitchAPI";
import { useSession } from "next-auth/react";

export async function connectToTwitch(session: any) {
  if (!session) {
    session = useSession();
  }

  const supabaseAdmin = await supabaseAdminConnectUser(session);

  const accessToken = supabaseAdmin.access_token;

  const clientConfig = {
    options: { debug: true },
    connection: {
      reconnect: true,
      secure: true,
    },
    identity: {
      username: "squib_channel",
      password: `oauth:${accessToken}`,
    },
    channels: ["squib_channel"],
  };

  const client = new tmi.Client(clientConfig);

  // If the connection fails attempt to refresh token first

  client.on("connected", async (address, port) => {
    console.log(`Connected to ${address}:${port}`);

    client.say("squib_channel", "Huge shoutout to @hyxu_ for the raid!");
  });

  client.on("message", (channel, tags, message, self) => {
    if (self) return;

    if (message.toLowerCase() === "!hello") {
      client.say(channel, `@${tags.username}, hello!`);
    }
  });

  try {
    await client.connect();
    return client;
  } catch (error) {
    console.error("Error connecting to Twitch:", error);
    // check for a token refresh
    throw error;
  }
}
