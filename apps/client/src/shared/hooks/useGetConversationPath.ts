import { useLocation } from 'react-router-dom';

function useGetConversationPath() {
  const { pathname } = useLocation();
  const isDesktopChat = pathname.split('/').includes('desktop');
  const conversationLink = isDesktopChat
    ? '/desktop/chat/conversation/'
    : '/chat/conversation/';

  return conversationLink;
}

export default useGetConversationPath;
