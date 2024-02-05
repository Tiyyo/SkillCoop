import ConversationCard from './card';
import { Dispatch, SetStateAction } from 'react';
import { Conversation, UpdateUserOnConversation } from '@skillcoop/types/src';
import { UseMutateFunction } from '@tanstack/react-query';
import Container from '../../../../layouts/container';
import SearchInput from '../../../../components/search-input';
import Tabs from '../tabs';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('chat');
  const isConversationsExits = conversations && conversations.length > 0;

  return (
    <Container className="flex-grow overflow-hidden lg:pb-24">
      <SearchInput onChange={getSearchInputValue} />
      <Tabs
        getClickValue={setCurrentConversationFilter}
        currentFilter={currentConversationFilter}
      />
      <div className="no-scrollbar flex flex-col overflow-y-auto lg:h-60vh">
        {!isConversationsExits && (
          <p className="w-full py-4 text-center text-xs italic text-light">
            {t('noDiscussions')}
          </p>
        )}
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