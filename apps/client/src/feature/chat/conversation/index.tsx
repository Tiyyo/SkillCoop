import { useNavigate, useParams } from 'react-router-dom';
import { useGetConversation } from '../../../hooks/useConversations';
import { socket } from '../socket';
import { Suspense, useEffect, useState } from 'react';
import { useApp } from '../../../store/app.store';
import Container from '../../../layout/container';
import ConversationCardImage from '../image-conversation';
import ConversationCardTitle from '../title-conversation';
import { ArrowLeft, Info } from 'lucide-react';
import LoadingPage from '../../../component/loading-page';
import useMessages from '../../../hooks/useMessages';
import ConversationMessages from './messages.container';
import ConversationInfos from '../conversation-infos';

function Conversation() {
  const navigate = useNavigate();
  const params = useParams();
  const { userId, userProfile } = useApp();
  const { data: conversation } = useGetConversation({
    conversationId: Number(params.id),
  });
  const {
    messages: historicMessages,
    displayNewMessage,
    getHistoric,
  } = useMessages();
  const [showConvInfos, setShowConvInfos] = useState(false);

  function connect() {
    socket.connect();
    socket.emit('username', userProfile?.username);
  }

  useEffect(() => {
    function onDisconnect(cause: string) {
      if (cause === 'io server disconnect') {
        socket.connect();
      }
    }

    if (conversation) {
      console.log('historic', conversation?.conversation_id);
      socket.emit('join_conversation', {
        conversation_id: conversation.conversation_id,
      });

      socket.on('connect', connect);
      socket.on('reconnect_attempt', () => {
        console.log('Attempting to reconnect');
      });
      socket.on('disconnect', () => {
        console.log('Disconnected');
      });
      socket.on('error', (error) => {
        console.log('Socket error:', error);
      });
      socket.on('historic', getHistoric);
      socket.on('new-message', displayNewMessage);
    }
    return () => {
      socket.off('connect', connect);
      socket.off('disconnect', onDisconnect);
      socket.off('new-message', displayNewMessage);
      socket.off('historic', getHistoric);
    };
  }, [conversation]);

  useEffect(() => {
    socket.on('historic', getHistoric);
  }, [conversation]);

  return (
    <Suspense fallback={<LoadingPage />}>
      <Container
        className="flex h-[calc(100vh-5rem)] flex-grow flex-col justify-between 
        p-0 lg:mt-4"
      >
        {conversation && (
          <header
            className="flex items-center justify-between gap-x-4 border-b
           border-b-grey-light px-4 py-2"
          >
            <div
              className="flex aspect-square cursor-pointer items-center 
              justify-center rounded-full border border-opacity-10 p-1.5 
            text-primary-700 shadow"
              onClick={() =>
                showConvInfos
                  ? setShowConvInfos(!showConvInfos)
                  : navigate('/chat')
              }
            >
              <ArrowLeft size={18} />
            </div>
            <div className="h-10 w-10">
              <ConversationCardImage
                participantsList={conversation.participants_list}
                typeConversation={conversation.type_name}
                currentUserId={userId}
              />
            </div>
            <div className="flex-grow">
              <ConversationCardTitle
                currentUserId={userId}
                title={conversation.title}
                participantsList={conversation.participants_list}
              />
            </div>
            <Info
              className="cursor-pointer text-primary-100"
              size={20}
              onClick={() => setShowConvInfos(!showConvInfos)}
            />
          </header>
        )}
        {showConvInfos ? (
          <ConversationInfos />
        ) : (
          <ConversationMessages
            historicMessages={historicMessages}
            userId={userId}
            userProfile={userProfile}
            conversation={conversation}
          />
        )}
      </Container>
    </Suspense>
  );
}

export default Conversation;
