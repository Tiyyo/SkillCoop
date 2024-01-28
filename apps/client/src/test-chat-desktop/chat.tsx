import { useParams } from 'react-router-dom';
/*eslint-disable */
import ConversationInfos from '../features/chat/conversation/conversation.infos';
import useConnectChatServer from '../hooks/useConnectChatServer';
import ConversationContainer from '../features/chat/conversation/conversation.container';
/*eslint-enable */

function ChatPageTest() {
  const params = useParams();
  const {
    conversation,
    setShowConvInfos,
    showConvInfos,
    historicMessages,
    userId,
    userProfile,
  } = useConnectChatServer(Number(params.id));

  return (
    <div className="h-[calc(70vh + 96px)] flex w-3/4 flex-grow">
      <div className="w-8/12 flex-grow basis-8/12">
        <ConversationContainer
          conversation={conversation}
          setShowConvInfos={setShowConvInfos}
          showConvInfos={showConvInfos}
          historicMessages={historicMessages}
          userId={userId}
          userProfile={userProfile}
        />
      </div>
      {conversation && (
        <ConversationInfos currentUserId={userId} conversation={conversation} />
      )}
    </div>
  );
}

export default ChatPageTest;
