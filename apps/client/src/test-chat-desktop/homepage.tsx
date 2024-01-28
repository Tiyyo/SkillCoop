import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useApp } from '../stores/app.store';
import HeaderHomePageChat from '../features/chat/home-page/header';
import useFiltersConversations from '../hooks/useFiltersConversations';
/*eslint-disable-next-line*/
import ConversationCardsContainer from '../features/chat/home-page/conversations-card-container';

function HomePageTestChat() {
  const navigate = useNavigate();
  const { userId } = useApp();
  const {
    getSearchInputValue,
    setCurrentConversationFilter,
    currentConversationFilter,
    conversations,
    updateLastSeenIndicator,
  } = useFiltersConversations(userId);

  useEffect(() => {
    if (!conversations) return;
    if (conversations.length > 0) {
      navigate(
        `/desktop/chat/conversation/${conversations[0].conversation_id}`,
      );
    }
  }, [conversations]);

  return (
    <div className="overflow-hidden rounded-lg">
      <HeaderHomePageChat />
      <div className="h-75vh flex w-full flex-grow">
        <div className="flex w-1/4 basis-1/4 flex-col">
          <ConversationCardsContainer
            getSearchInputValue={getSearchInputValue}
            setCurrentConversationFilter={setCurrentConversationFilter}
            currentConversationFilter={currentConversationFilter}
            conversations={conversations}
            updateLastSeenIndicator={updateLastSeenIndicator}
            userId={userId}
          />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default HomePageTestChat;
