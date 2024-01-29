import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useApp } from '../../../stores/app.store';
import useFiltersConversations from '../../../hooks/useFiltersConversations';
import HeaderHomePageChat from '../shared/home-page/header';
/*eslint-disable-next-line*/
import ConversationCardsContainer from '../shared/home-page/conversations-card-container';

function DesktopChatHomePage() {
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
      <div className="flex h-75vh w-full flex-grow">
        <div className="flex w-1/4 min-w-max basis-1/4 flex-col">
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

export default DesktopChatHomePage;
