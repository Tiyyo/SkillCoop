import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type conversation = {
  conversation_id: Generated<number>;
  title: string | null;
  type_name: string;
  event_id: number | null;
  last_update: string | null;
  created_at: string;
  updated_at: string | null;
};
export type convertion_type = {
  name: string;
  created_at: string;
  updated_at: string | null;
};
export type message = {
  message_id: Generated<number>;
  user_id: string | null;
  conversation_id: number;
  message: string;
  created_at: string;
  updated_at: string | null;
};
export type user = {
  user_id: string;
  username: string;
  avatar: string | null;
  created_at: string;
  updated_at: string | null;
};
export type user_on_conversation = {
  id: Generated<number>;
  user_id: string;
  conversation_id: number;
  is_admin: Generated<number>;
  last_seen: string | null;
  created_at: string;
  updated_at: string | null;
};
export type DB = {
  conversation: conversation;
  convertion_type: convertion_type;
  message: message;
  user: user;
  user_on_conversation: user_on_conversation;
};
