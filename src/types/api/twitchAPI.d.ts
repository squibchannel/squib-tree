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

export type BroadcasterSubscription = {
  data: {
    broadcaster_id: string;
    broadcaster_login: string;
    broadcaster_name: string;
    gifter_id: string; // An empty string if is_gift is false
    gifter_login: string; // An empty string if is_gift is false
    gifter_name: string; // An empty string if is_gift is false
    is_gift: boolean; // true if the subscription was gifted
    plan_name: string;
    tier: "1000" | "2000" | "3000"; // Tier 1, Tier 2, Tier 3
    user_id: string;
    user_name: string;
    user_login: string;
  }[];
  pagination: {
    cursor: string; // The cursor used to get the next or previous page of results
    points: number; // The current number of subscriber points earned by this broadcaster
    total: number; // The total number of users that subscribe to this broadcaster
  };
};

// Request Body Type
export interface SendMessageRequest {
  broadcaster_id: string; // The ID of the broadcaster whose chat room the message will be sent to.
  sender_id: string; // The ID of the user sending the message. This ID must match the user ID in the user access token.
  message: string; // The message to send. The message is limited to a maximum of 500 characters.
  reply_parent_message_id?: string; // The ID of the chat message being replied to.
}

// Response Body Types
export interface DropReason {
  code: string; // Code for why the message was dropped.
  message: string; // Message for why the message was dropped.
}

export interface SendMessageResponse {
  data: {
    message_id: string; // The message id for the message that was sent.
    is_sent: boolean; // If the message passed all checks and was sent.
    drop_reason?: DropReason; // The reason the message was dropped, if any.
  }[];
}
