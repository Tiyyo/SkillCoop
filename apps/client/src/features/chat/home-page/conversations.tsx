import { Link } from 'react-router-dom';
import {
  useGetConversationsList,
  useUpdateUserOnConversation,
} from '../../../hooks/useConversations';
import Container from '../../../layouts/container';
import { useApp } from '../../../stores/app.store';
import Tabs from '../tabs';
import { useState } from 'react';
import TitleH1 from '../../../components/title-h1';
import { Plus } from 'lucide-react';
import ConversationCard from './card';
import { useTranslation } from 'react-i18next';
import SearchInput from '../../../components/search-input';
import { Conversation } from '@skillcoop/types/src';

const convertFilterIntoMatchingTypeName = {
  all: 'all',
  event: 'event',
  group: 'group',
  personal: 'oneToOne',
};

function Conversations() {
  const { userId } = useApp();
  const { t } = useTranslation('chat');
  const { mutate: updateLastSeenIndicator } = useUpdateUserOnConversation({});
  const [currentConversationFilter, setCurrentConversationFilter] = useState<
    'all' | 'event' | 'group' | 'personal'
  >('all');
  const [searchInputValue, setSearchInputValue] = useState('');
  const { data: conversations } = useGetConversationsList({ userId: userId });

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
    if (!conversations) return [];
    return conversation.participants_list.map((p) => p.username.toLowerCase());
  };

  const getSearchInputValue = (value: string) => {
    setSearchInputValue(value);
  };

  return (
    <>
      <Container className="flex items-center justify-between lg:mt-4">
        <TitleH1
          title={t('conversations')}
          legend={t('retrieveAllConversations')}
        />
        <Link
          to={`new-conversation/${userId}`}
          className={`lg:text-smtext-base-light flex cursor-pointer 
          items-center gap-2 rounded-full bg-primary-800 p-0.5 text-xs 
          font-semibold shadow-md duration-300 hover:bg-primary-500
         hover:text-dark sm:px-6`}
        >
          <Plus />
        </Link>
      </Container>
      <Container className="flex-grow lg:mt-4">
        <SearchInput onChange={getSearchInputValue} />
        <Tabs
          getClickValue={setCurrentConversationFilter}
          currentFilter={currentConversationFilter}
        />
        <div className="flex flex-col">
          {userId &&
            conversations &&
            conversations.length > 0 &&
            conversations
              .filter(
                (conversation: any) =>
                  (conversation.type_name === 'group' ||
                    (conversation.type_name === 'event' &&
                      conversation.last_message) ||
                    conversation.type_name === 'oneToOne') &&
                  filterConversationByType(
                    conversation.type_name,
                    currentConversationFilter,
                  ),
              )
              .filter((conversation) => {
                if (!searchInputValue || !conversation.title) return true;
                return (
                  conversation.title
                    .toLowerCase()
                    .includes(searchInputValue.toLowerCase()) ||
                  participantsUsernameByConversation(conversation).includes(
                    searchInputValue.toLocaleLowerCase(),
                  )
                );
              })
              .map((conversation: any) => (
                <ConversationCard
                  conversation={conversation}
                  currentUserId={userId}
                  updateLastSeen={updateLastSeenIndicator}
                  key={conversation.conversation_id}
                />
              ))}
        </div>
      </Container>
    </>
  );
}

export default Conversations;
