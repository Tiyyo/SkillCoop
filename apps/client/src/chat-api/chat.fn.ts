import axios from 'axios';
import {
  Conversation,
  CreateGroupConversation,
  CreateOneToOneConversation,
  UpdateUserOnConversation,
} from '@skillcoop/types/src';

export const api = axios.create({
  baseURL: 'http://localhost:8083',
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
): Promise<{ conversationId: number }> => {
  const response = await api.post(
    '/chat-serivce/conversation/find-or-create',
    data,
  );
  return response.data;
};

export const createGroupConversationFn = async (
  data: CreateGroupConversation,
): Promise<{ conversationId: number }> => {
  const response = await api.post('/chat-serivce/conversation/group', data);
  return response.data;
};
