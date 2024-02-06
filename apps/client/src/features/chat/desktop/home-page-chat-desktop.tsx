import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../../stores/app.store';
import useFiltersConversations from '../../../hooks/useFiltersConversations';
import HeaderHomePageChat from '../shared/home-page/header';
/*eslint-disable-next-line*/
import ConversationCardsContainer from '../shared/home-page/conversations-card-container';
import Container from '../../../layouts/container';
import { useTranslation } from 'react-i18next';

function DesktopChatHomePage() {
  const { t } = useTranslation('chat');
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useApp();
  const {
    getSearchInputValue,
    setCurrentConversationFilter,
    currentConversationFilter,
    conversations,
  } = useFiltersConversations(userId);

  const isConversationsExits =
    (!!conversations && !!(conversations.length > 0)) ||
    location.pathname.split('/').includes('new-conversation');

  useEffect(() => {
    if (!conversations) return;
    if (conversations.length > 0) {
      navigate(
        location.pathname ??
          `/desktop/chat/conversation/${conversations[0].conversation_id}`,
      );
    }
  }, [conversations]);

  return (
    <div className="overflow-hidden rounded-lg">
      <HeaderHomePageChat />
      <div className="flex h-[calc(100vh-214px)] w-full flex-grow">
        <div className="flex w-1/4 min-w-[270px] basis-1/4 flex-col">
          <ConversationCardsContainer
            getSearchInputValue={getSearchInputValue}
            setCurrentConversationFilter={setCurrentConversationFilter}
            currentConversationFilter={currentConversationFilter}
            conversations={conversations}
            userId={userId}
          />
        </div>
        {isConversationsExits ? (
          <Outlet />
        ) : (
          <Container className="flex flex-grow items-center justify-center ">
            {' '}
            {!isConversationsExits && (
              <p className="w-full py-4 text-center text-xs italic text-light">
                {t('noDiscussions')}
              </p>
            )}
          </Container>
        )}
      </div>
    </div>
  );
}

export default DesktopChatHomePage;
