/*eslint-disable*/
import ConversationCardsContainer from '../shared/home-page/conversations-card-container';
/*eslint-enable*/
import useFiltersConversations from '../../../hooks/useFiltersConversations';
import { useApp } from '../../../stores/app.store';
import HeaderHomePageChat from '../shared/home-page/header';
import { Outlet } from 'react-router-dom';

function MobileChatHomePage() {
  const { userId } = useApp();
  const {
    getSearchInputValue,
    setCurrentConversationFilter,
    currentConversationFilter,
    conversations,
    updateLastSeenIndicator,
  } = useFiltersConversations(userId);

  return (
    <>
      <HeaderHomePageChat />
      <ConversationCardsContainer
        getSearchInputValue={getSearchInputValue}
        setCurrentConversationFilter={setCurrentConversationFilter}
        currentConversationFilter={currentConversationFilter}
        conversations={conversations}
        updateLastSeenIndicator={updateLastSeenIndicator}
        userId={userId}
      />
      <Outlet />
    </>
  );
}

export default MobileChatHomePage;
