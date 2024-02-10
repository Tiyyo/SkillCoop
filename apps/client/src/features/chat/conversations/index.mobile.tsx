import ConversationCardsContainer from './container';

import useFiltersConversations from '../hooks/useFiltersConversations';
import { useApp } from '../../../shared/store/app.store';
import HeaderHomePageChat from './header';
import { Outlet } from 'react-router-dom';

function MobileChatHomePage() {
  const { userId } = useApp();
  const {
    getSearchInputValue,
    setCurrentConversationFilter,
    currentConversationFilter,
    conversations,
  } = useFiltersConversations(userId);

  return (
    <>
      <HeaderHomePageChat />
      <ConversationCardsContainer
        getSearchInputValue={getSearchInputValue}
        setCurrentConversationFilter={setCurrentConversationFilter}
        currentConversationFilter={currentConversationFilter}
        conversations={conversations}
        userId={userId}
      />
      <Outlet />
    </>
  );
}

export default MobileChatHomePage;
