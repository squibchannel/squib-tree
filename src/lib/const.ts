export const socials: { title: string; href: string; description: string }[] = [
  {
    title: "Twitch",
    href: "https://www.twitch.tv/squib_channel",
    description: "Squib streams live on Twitch most days of the week.",
  },
  {
    title: "Twitter",
    href: "https://twitter.com/Squibchannel",
    description: "Check out Squib's latest tweets and rage bait!",
  },
  {
    title: "Youtube",
    href: "https://www.youtube.com/@squib-channel",
    description:
      "I put my vods and longer clips here! Video essays coming one day soon.",
  },
  {
    title: "TikTok",
    href: "https://www.tiktok.com/@squib_channel",
    description: "Millenial just trying to heal.",
  },
  {
    title: "Discord",
    href: "https://discord.gg/jFzGVuwx3G",
    description:
      "Join the squib_channel discord to keep up with all the latest news and shenanigans.",
  },
  {
    title: "Github",
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
    href: "/dashboard/settings",
  },
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
