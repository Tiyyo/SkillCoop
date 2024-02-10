import { useParams } from 'react-router-dom';
import { Suspense } from 'react';
import LoadingPage from '../../../shared/components/loading-page';
import ConversationContainer from './container';
import useConnectChatServer from '../hooks/useConnectChatServer';

function MobileConversationPage() {
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
    <Suspense fallback={<LoadingPage />}>
      <ConversationContainer
        conversation={conversation}
        setShowConvInfos={setShowConvInfos}
        showConvInfos={showConvInfos}
        historicMessages={historicMessages}
        userId={userId}
        userProfile={userProfile}
      />
    </Suspense>
  );
}

export default MobileConversationPage;
