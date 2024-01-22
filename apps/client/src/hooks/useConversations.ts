import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createGroupConversationFn,
  findOrCreateOneToOneConversationFn,
  getConversationFn,
  getConversationsFn,
  updateUserOnConversationFn,
} from '../api/chat.fn';
import {
  CreateGroupConversation,
  CreateOneToOneConversation,
  UpdateUserOnConversation,
} from 'packages/types/src';

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
export function useUpdateUserOnConversation(options: {
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateUserOnConversation) => {
      return updateUserOnConversationFn(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(keys.getConversations);
      if (options.onSuccess) options.onSuccess;
    },
  });
}

export function useFindOrCreateOneToOneConversation(options: {
  onSuccess?: (args: any) => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateOneToOneConversation) => {
      return findOrCreateOneToOneConversationFn(data);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries(keys.getConversations);
      if (options.onSuccess) options.onSuccess(response);
    },
  });
}

export function useCreateGroupConversation(options: {
  onSuccess?: (args: any) => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateGroupConversation) => {
      return createGroupConversationFn(data);
    },
    onSuccess: (response: any) => {
      queryClient.invalidateQueries(keys.getConversations);
      if (options.onSuccess) options.onSuccess(response);
    },
  });
}
