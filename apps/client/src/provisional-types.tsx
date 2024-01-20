export type MessageReceived = {
  message_id: number;
  user_id: number;
  username: string;
  avatar: string;
  message: string;
  created_at: string;
  updated_at: string;
};

export type Message = {
  message: string;
  created_at: string;
  updated_at: string;
};

export type AuthorGroup = {
  user_id: number;
  username: string;
  avatar: string;
  messages: Message[];
};

export type DateGroup = {
  date: string;
  groupAuthor: AuthorGroup[];
};

export type Messages = DateGroup[];
