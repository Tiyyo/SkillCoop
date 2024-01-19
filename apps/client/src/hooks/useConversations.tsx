import { useQuery } from '@tanstack/react-query';
import { getConversationFn, getConversationsFn } from '../chat-api/chat.fn';

const keys = {
  getConversations: ['conversations'],
  getConversation: (conversationId?: number) => [
    'conversation',
    conversationId?.toString(),
  ],
};

export function useGetConversationsList(options: { userId?: number | null }) {
  return useQuery(keys.getConversations, async () => {
    if (!options.userId) return;
    return getConversationsFn(options.userId);
  });
}

export function useGetConversation(options: {
  conversationId: number | undefined;
}) {
  return useQuery(
    keys.getConversation(options.conversationId),
    async () => {
      if (!options.conversationId) return null;
      return getConversationFn(options.conversationId);
    },
    { enabled: !!options.conversationId },
  );
}
