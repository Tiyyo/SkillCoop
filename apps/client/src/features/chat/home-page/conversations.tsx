import HeaderHomePageChat from './header';
import ConversationCardsContainer from './conversations-card-container';
import useFiltersConversations from '../../../hooks/useFiltersConversations';
import { useApp } from '../../../stores/app.store';

function Conversations() {
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
    </>
  );
}

export default Conversations;
