import { Link } from 'react-router-dom';
import {
  useGetConversationsList,
  useUpdateUserOnConversation,
} from '../../../hooks/useConversations';
import Container from '../../../layout/container';
import { useApp } from '../../../store/app.store';
import Tabs from '../tabs';
import { useState } from 'react';
import TitleH1 from '../../../component/title-h1';
import { Plus } from 'lucide-react';
import ConversationCard from './card';
import { useTranslation } from 'react-i18next';
import SearchInput from '../../../component/search-input';

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
        <SearchInput />
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
