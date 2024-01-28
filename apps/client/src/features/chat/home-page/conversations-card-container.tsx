import Container from '../../../layouts/container';
import Tabs from '../tabs';
import ConversationCard from './card';
import SearchInput from '../../../components/search-input';
import { Dispatch, SetStateAction } from 'react';
import { Conversation, UpdateUserOnConversation } from '@skillcoop/types/src';
import { UseMutateFunction } from '@tanstack/react-query';

type ConversationCardsContainerProps = {
  getSearchInputValue: (value: string) => void;
  setCurrentConversationFilter: Dispatch<
    SetStateAction<'all' | 'event' | 'group' | 'personal'>
  >;
  currentConversationFilter: 'all' | 'event' | 'group' | 'personal';
  conversations: Conversation[] | undefined;
  updateLastSeenIndicator: UseMutateFunction<
    boolean,
    unknown,
    UpdateUserOnConversation,
    unknown
  >;
  userId: number | null | undefined;
};

function ConversationCardsContainer({
  getSearchInputValue,
  setCurrentConversationFilter,
  currentConversationFilter,
  conversations,
  updateLastSeenIndicator,
  userId,
}: ConversationCardsContainerProps) {
  return (
    <Container className="flex-grow overflow-hidden lg:pb-24">
      <SearchInput onChange={getSearchInputValue} />
      <Tabs
        getClickValue={setCurrentConversationFilter}
        currentFilter={currentConversationFilter}
      />
      <div className="no-scrollbar lg:h-60vh flex flex-col overflow-y-auto">
        {userId &&
          conversations &&
          conversations.length > 0 &&
          conversations.map((conversation: any) => (
            <ConversationCard
              conversation={conversation}
              currentUserId={userId}
              updateLastSeen={updateLastSeenIndicator}
              key={conversation.conversation_id}
            />
          ))}
      </div>
    </Container>
  );
}

export default ConversationCardsContainer;
