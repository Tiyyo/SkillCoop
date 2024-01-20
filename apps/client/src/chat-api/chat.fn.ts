import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8083',
  withCredentials: true,
});

export const getConversationsFn = async (userId: number | null) => {
  const response = await api.get(`/chat-serivce/conversations/${userId}`);
  return response.data;
};

export const getConversationFn = async (conversationId: number | undefined) => {
  const response = await api.get(
    `/chat-serivce/conversation/${conversationId}`,
  );
  return response.data;
};

export const updateUserOnConversationFn = async (data) => {
  const response = await api.patch('/chat-serivce/user-conversation', data);
  return response.data;
};
