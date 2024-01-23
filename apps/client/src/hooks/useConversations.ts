import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addParticipantsToConversationGroupFn,
  createGroupConversationFn,
  deleteConversationFn,
  findOrCreateOneToOneConversationFn,
  getConversationFn,
  getConversationsFn,
  removeFromConversationGroupFn,
  updateUserOnConversationFn,
} from '../api/chat.fn';
import {
  AddParticipantGroupConversation,
  CreateGroupConversation,
  CreateOneToOneConversation,
  DeleteConversation,
  RemoveParticipantGroupConversation,
  UpdateUserOnConversation,
} from '@skillcoop/types';

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
  conversationId: number;
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateUserOnConversation) => {
      return updateUserOnConversationFn(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        keys.getConversation(options.conversationId),
      );
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

export function useRemoveFromConversationGroup(options: {
  conversationId: number;
  onSuccess?: (args: any) => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RemoveParticipantGroupConversation) => {
      return removeFromConversationGroupFn(data);
    },
    onSuccess: (response: any) => {
      queryClient.invalidateQueries(
        keys.getConversation(options.conversationId),
      );
      if (options.onSuccess) options.onSuccess(response);
    },
  });
}

export function useAddParticipantsToConversationGroup(options: {
  conversationId: number;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddParticipantGroupConversation) => {
      return addParticipantsToConversationGroupFn(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        keys.getConversation(options.conversationId),
      );
    },
  });
}

export function useDeleteConversation(options: {
  conversationId: number;
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DeleteConversation) => {
      return deleteConversationFn(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(
        keys.getConversation(options.conversationId),
      );
      if (options.onSuccess) options.onSuccess();
    },
  });
}
