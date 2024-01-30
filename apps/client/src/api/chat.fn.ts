import axios from 'axios';
import {
  AddParticipantGroupConversation,
  Conversation,
  CreateGroupConversation,
  CreateOneToOneConversation,
  DeleteConversation,
  RemoveParticipantGroupConversation,
  UpdateUserOnConversation,
} from '@skillcoop/types/src';
import { CHAT_SERVER_URL } from '../utils/server';

export const api = axios.create({
  baseURL: CHAT_SERVER_URL,
  withCredentials: true,
});

export const getConversationsFn = async (
  userId: number,
): Promise<Conversation[]> => {
  const response = await api.get(`/chat-serivce/conversations/${userId}`);
  return response.data;
};

export const getConversationFn = async (
  conversationId: number,
): Promise<Conversation> => {
  const response = await api.get(
    `/chat-serivce/conversation/${conversationId}`,
  );
  return response.data;
};

export const updateUserOnConversationFn = async (
  data: UpdateUserOnConversation,
): Promise<boolean> => {
  const response = await api.patch('/chat-serivce/user-conversation', data);
  return response.data;
};

export const findOrCreateOneToOneConversationFn = async (
  data: CreateOneToOneConversation,
): Promise<{ conversation_id: number }> => {
  const response = await api.post(
    '/chat-serivce/conversation/find-or-create',
    data,
  );
  return response.data;
};

export const createGroupConversationFn = async (
  data: CreateGroupConversation,
): Promise<{ conversation_id: number }> => {
  const response = await api.post('/chat-serivce/conversation/group', data);
  return response.data;
};

export const removeFromConversationGroupFn = async (
  data: RemoveParticipantGroupConversation,
): Promise<boolean> => {
  const response = await api.delete(
    /*eslint-disable-next-line*/
    `/chat-serivce/user-conversation/group/${data.conversation_id}/${data.participant_id}`,
  );
  return response.data;
};

export const addParticipantsToConversationGroupFn = async (
  data: AddParticipantGroupConversation,
): Promise<boolean> => {
  const response = await api.patch(
    `/chat-serivce/user-conversation/group`,
    data,
  );
  return response.data;
};

export const deleteConversationFn = async (
  data: DeleteConversation,
): Promise<boolean> => {
  const response = await api.delete(
    `/chat-serivce/conversation/${data.conversation_id}/${data.user_id}`,
  );
  return response.data;
};
