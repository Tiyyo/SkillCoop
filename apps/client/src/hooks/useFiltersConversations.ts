import { useMemo, useState } from 'react';
import {
  useGetConversationsList,
  useUpdateUserOnConversation,
} from './useConversations';
import { Conversation } from '@skillcoop/types/src';

const convertFilterIntoMatchingTypeName = {
  all: 'all',
  event: 'event',
  group: 'group',
  personal: 'oneToOne',
};

export default function useFiltersConversations(userId?: number | null) {
  const { mutate: updateLastSeenIndicator } = useUpdateUserOnConversation({});
  const { data: fetchConversations } = useGetConversationsList({
    userId: userId,
  });

  const [currentConversationFilter, setCurrentConversationFilter] = useState<
    'all' | 'event' | 'group' | 'personal'
  >('all');
  const [searchInputValue, setSearchInputValue] = useState('');

  const getSearchInputValue = (value: string) => {
    setSearchInputValue(value);
  };

  const filterConversationByType = (type: string, filter: string) => {
    if (filter === 'all') return true;
    return (
      type ===
      convertFilterIntoMatchingTypeName[
        filter as keyof typeof convertFilterIntoMatchingTypeName
      ]
    );
  };

  const participantsUsernameByConversation = (
    conversation: Conversation,
  ): string[] => {
    if (!conversation) return [];
    return conversation.participants_list.map((p) => p.username.toLowerCase());
  };

  const conversations = useMemo(() => {
    const conversations = fetchConversations
      ?.filter(
        (conversation) =>
          (conversation.type_name === 'group' ||
            (conversation.type_name === 'event' && conversation.last_message) ||
            conversation.type_name === 'oneToOne') &&
          filterConversationByType(
            conversation.type_name,
            currentConversationFilter,
          ),
      )
      .filter((conversation) => {
        if (!searchInputValue) return true;
        return participantsUsernameByConversation(conversation).some(
          (username) =>
            username
              .toLowerCase()
              .includes(searchInputValue.toLocaleLowerCase()) ||
            (conversation.title &&
              conversation.title
                .toLowerCase()
                .includes(searchInputValue.toLowerCase())),
        );
      });
    return conversations;
  }, [fetchConversations, searchInputValue, currentConversationFilter]);

  return {
    conversations,
    setCurrentConversationFilter,
    currentConversationFilter,
    getSearchInputValue,
    updateLastSeenIndicator,
  };
}
