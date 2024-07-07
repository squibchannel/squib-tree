import {
  Silkscreen as SilkscreenLoader,
  Roboto as RobotoLoader,
  Titillium_Web as TitilliumWebLoader,
  Lora as LoraLoader,
  Ubuntu as UbuntuLoader,
  Oswald as OswaldLoader,
  Inter as InterLoader,
  Shadows_Into_Light as ShadowsIntoLightLoader,
  Permanent_Marker as PermanentMarkerLoader,
  Satisfy as SatisfyLoader,
  Acme as AcmeLoader,
  Changa as ChangaLoader,
  Sacramento as SacramentoLoader,
  Unna as UnnaLoader,
} from "next/font/google";

const Silkscreen = SilkscreenLoader({ weight: "400", subsets: ["latin"] });
const Roboto = RobotoLoader({ weight: "400", subsets: ["latin"] });
const Titillium_Web = TitilliumWebLoader({ weight: "400", subsets: ["latin"] });
const Lora = LoraLoader({ weight: "400", subsets: ["latin"] });
const Ubuntu = UbuntuLoader({ weight: "400", subsets: ["latin"] });
const Oswald = OswaldLoader({ weight: "400", subsets: ["latin"] });
const Inter = InterLoader({ weight: "400", subsets: ["latin"] });
const Shadows_Into_Light = ShadowsIntoLightLoader({
  weight: "400",
  subsets: ["latin"],
});
const Permanent_Marker = PermanentMarkerLoader({
  weight: "400",
  subsets: ["latin"],
});
const Satisfy = SatisfyLoader({ weight: "400", subsets: ["latin"] });
const Acme = AcmeLoader({ weight: "400", subsets: ["latin"] });
const Changa = ChangaLoader({ weight: "400", subsets: ["latin"] });
const Sacramento = SacramentoLoader({ weight: "400", subsets: ["latin"] });
const Unna = UnnaLoader({ weight: "400", subsets: ["latin"] });

export enum FontKey {
  Silkscreen = "Silkscreen",
  Roboto = "Roboto",
  Titillium_Web = "Titillium_Web",
  Lora = "Lora",
  Ubuntu = "Ubuntu",
  Oswald = "Oswald",
  Inter = "Inter",
  Shadows_Into_Light = "Shadows_Into_Light",
  Permanent_Marker = "Permanent_Marker",
  Satisfy = "Satisfy",
  Acme = "Acme",
  Changa = "Changa",
  Sacramento = "Sacramento",
  Unna = "Unna",
}

export const fontMap = {
  [FontKey.Silkscreen]: Silkscreen.className,
  [FontKey.Roboto]: Roboto.className,
  [FontKey.Titillium_Web]: Titillium_Web.className,
  [FontKey.Lora]: Lora.className,
  [FontKey.Ubuntu]: Ubuntu.className,
  [FontKey.Oswald]: Oswald.className,
  [FontKey.Inter]: Inter.className,
  [FontKey.Shadows_Into_Light]: Shadows_Into_Light.className,
  [FontKey.Permanent_Marker]: Permanent_Marker.className,
  [FontKey.Satisfy]: Satisfy.className,
  [FontKey.Acme]: Acme.className,
  [FontKey.Changa]: Changa.className,
  [FontKey.Sacramento]: Sacramento.className,
  [FontKey.Unna]: Unna.className,
};

export type SocialProps = {
  platform: string;
  href: string;
  description: string;
};

export const socials: {
  platform: string;
  href: string;
  description: string;
}[] = [
  {
    platform: "Twitch",
    href: "https://www.twitch.tv/squib_channel",
    description: "Squib streams live on Twitch most days of the week.",
  },
  {
    platform: "Twitter",
    href: "https://twitter.com/Squibchannel",
    description: "Check out Squib's latest tweets and rage bait!",
  },
  {
    platform: "Youtube",
    href: "https://www.youtube.com/@squib-channel",
    description:
      "I put my vods and longer clips here! Video essays coming one day soon.",
  },
  {
    platform: "TikTok",
    href: "https://www.tiktok.com/@squib_channel",
    description: "Millenial just trying to heal.",
  },
  {
    platform: "Discord",
    href: "https://discord.gg/jFzGVuwx3G",
    description:
      "Join the squib_channel discord to keep up with all the latest news and shenanigans.",
  },
  {
    platform: "Github",
    href: "https://github.com/squibchannel",
    description: "I write code sometimes and when I do I put it on the hub.",
  },
];

export const keywordHashURL = "https://hashtag5.p.rapidapi.com/api/v2.1";

type dashboardMenu = {
  name: string;
  href: string;
};

export const dashboardMenu: dashboardMenu[] = [
  {
    name: "Followers",
    href: "/dashboard/followers",
  },
  {
    name: "Subscribers",
    href: "/dashboard/subs",
  },
  {
    name: "Mods",
    href: "/dashboard/mods",
  },
  {
    name: "Vips",
    href: "/dashboard/vips",
  },
  {
    name: "Editors",
    href: "/dashboard/editors",
  },
  {
    name: "Clips",
    href: "/dashboard/clips",
  },
  {
    name: "Chat",
    href: "/dashboard/chat",
  },
  {
    name: "Settings",
    href: "/dashboard/settings/general",
  },
];

export const settingsLinksList = [
  { href: "/dashboard/settings/general", label: "General" },
  { href: "/dashboard/settings/socials", label: "Socials" },
  { href: "/dashboard/settings/keys", label: "Api Keys" },
  { href: "/dashboard/settings/contact", label: "Contact" },
  { href: "/dashboard/settings/bot", label: "Bot Config" },
];

// twitch scopes
export const TWITCH_SCOPES = [
  "openid",
  "user:read:email",
  "user:read:follows",
  "channel:read:subscriptions",
  "moderator:read:followers",
  "channel:read:charity",
  "user:write:chat",
  "moderation:read",
  "channel:manage:moderators",
  "channel:read:vips",
  "channel:manage:vips",
  "channel:read:editors",
  "moderator:read:chatters",
  "user:write:chat",
  "user:bot",
  "channel:bot",
  "chat:read",
  "chat:edit",
];

export const testTags: string[] = [
  "love",
  "instagood",
  "photooftheday",
  "fashion",
  "beautiful",
  "happy",
  "cute",
  "tbt",
  "like4like",
  "followme",
  "picoftheday",
  "follow",
  "me",
  "selfie",
  "summer",
  "art",
  "instadaily",
  "friends",
  "repost",
  "nature",
  "girl",
  "fun",
  "style",
  "smile",
  "food",
  "instalike",
  "family",
  "travel",
  "likeforlike",
  "fitness",
  "follow4follow",
  "igers",
  "tagsforlikes",
  "nofilter",
  "life",
  "beauty",
  "amazing",
  "instagram",
  "photography",
  "photo",
  "vscocam",
  "sun",
  "music",
  "followforfollow",
  "beach",
  "ootd",
  "bestoftheday",
  "sunset",
  "dog",
  "sky",
  "vsco",
  "l4l",
  "makeup",
  "foodporn",
  "f4f",
  "hair",
  "pretty",
  "cat",
  "model",
  "swag",
  "motivation",
  "girls",
  "party",
  "baby",
  "cool",
  "gym",
  "lol",
  "design",
  "instapic",
  "funny",
  "healthy",
  "christmas",
  "night",
  "lifestyle",
  "yummy",
  "flowers",
  "tflers",
  "hot",
  "handmade",
  "instafood",
  "wedding",
  "fit",
  "black",
  "일상",
  "pink",
  "blue",
  "workout",
  "work",
  "blackandwhite",
  "drawing",
  "inspiration",
  "holiday",
  "home",
  "london",
  "nyc",
  "sea",
  "instacool",
  "winter",
  "goodmorning",
  "blessed",
];
