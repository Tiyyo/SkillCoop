export type AuthorGroupMessages = {
  user_id: number;
  username: string;
  avatar: string | null;
  messages: Message[];
}

export type Conversation = {
  conversation_id: number;
  title: string | null;
  type_name: TypeConversation;
  last_seen: string | null;
  last_update: string | null;
  participants_list: Array<ConversationParticipant>;
  last_message: LastMessage | null;
};

export type ConversationParticipant = {
  user_id: number;
  username: string;
  avatar: string | null;
};

export type CreateOneToOneConversation = {
  user_id_one: number;
  user_id_two: number;
};

export type CreateGroupConversation = {
  creator_id: number;
  title?: string;
  participants_ids: number[];
}

export type GetConversation = {
  conversation_id: number;
};

export type GetConversationList = {
  user_id: number;
};

export type DeleteConversation = {
  conversation_id: number;
  user_id: number;
}

export type AddParticipantGroupConversation = {
  conversation_id: number;
  participants_ids: number[];
}

export type RemoveParticipantGroupConversation = {
  conversation_id: number;
  participant_id: number;
}

export type ResponseCreateConversation = {
  conversationId: number;
}

export type UpdateUserOnConversationConditions = {
  conversation_id: number;
  user_id: number;
}

export type DateGroupMessages = {
  date: string;
  author_groups: AuthorGroupMessages[];
}

export type HistoricMessages = DateGroupMessages[];

export type Historic = {
  messages: HistoricMessages;
  conversation_id: number;
}

export type LastMessage = {
  user_id: number;
  content: string;
  created_at: string;
};

export type Message = {
  message_id: number;
  message: string;
  created_at: string;
  updated_at: string | null;
}

export type MessageStore = {
  message_id: number;
  user_id: number;
  username: string;
  avatar: string | null;
  message: string;
  created_at: string;
  updated_at: string | null;
}

export type TypeConversation = 'oneToOne' | 'group' | 'event';

export const typeConversationAssert = {
  oneToOne: 'oneToOne',
  group: 'group',
  event: 'event',
} as const;

export type UpdateblePropsUserOnConversation = {
  last_seen?: string;
  is_admin?: 0 | 1;
}

export type CreateMessageStore = {
  content: string;
  sender: number;
  conversation_id: number;
}

export type UpdateMessage = {
  message_id: number;
  content: string;
}

export type DeleteMessage = {
  message_id: number;
}

export type UpdateUserOnConversation = UpdateUserOnConversationConditions & UpdateblePropsUserOnConversation;

export type FriendStoreChat = {
  userId: number;
  username: string;
  avatar: string | null;
};