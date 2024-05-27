export type TwitchFollowedChannelsResponse = {
  data: {
    followed_at: string;
    user_id: string;
    user_login: string;
    user_name: string;
  }[];
  pagination: {
    cursor: string;
  };
  total: number;
};
