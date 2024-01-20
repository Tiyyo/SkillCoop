import { Link } from 'react-router-dom';
import {
  useGetConversationsList,
  useUpdateUserOnConversation,
} from '../../hooks/useConversations';
import Container from '../../layout/container';
import { useApp } from '../../store/app.store';
import Tabs from './tabs';
import { useState } from 'react';
import TitleH1 from '../../component/title-h1';
import { Plus } from 'lucide-react';
import ConversationCard from './conversation-card';
import { useTranslation } from 'react-i18next';
import SearchInput from '../../component/search-input';

function Conversations() {
  const { userId } = useApp();
  const { t } = useTranslation('chat');
  const { mutate: updateLastSeenIndicator } = useUpdateUserOnConversation({});
  const [currentConversationFilter, setCurrentConversationFilter] = useState<
    'all' | 'event' | 'group' | 'personal'
  >('all');
  const { data: conversations } = useGetConversationsList({ userId: userId });
  console.log(conversations);
  const convertFilterIntoMatchingTypeName = {
    all: 'all',
    event: 'event',
    group: 'group',
    personal: 'oneToOne',
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

  return (
    <>
      <Container className="lg:mt-4 flex items-center justify-between">
        <TitleH1
          title={t('conversations')}
          legend={t('retrieveAllConversations')}
        />
        <Link
          to="invitation"
          className={`flex shadow-md items-center gap-2 py-2.5 text-xs 
          lg:text-smtext-base-light bg-primary-800 px-2.5 sm:px-6 
          rounded-full font-semibold cursor-pointer hover:text-dark
         hover:bg-primary-500 duration-300`}
        >
          <Plus />
        </Link>
      </Container>
      <Container className="lg:mt-4 flex-grow">
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
                  conversation.last_message &&
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
