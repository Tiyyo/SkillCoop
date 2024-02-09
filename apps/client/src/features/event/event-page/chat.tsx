import { cn } from '../../../lib/utils';
import { useEffect, useState } from 'react';
import { ArrowLeft, Info, MessageSquare } from 'lucide-react';
import ConversationInfos from '../../chat/shared/conversation/infos';
import ConversationCardTitle from '../../chat/shared/title-conversation';
import ConversationCardImage from '../../chat/shared/image-conversation';
import Container from '../../../layouts/container';
import { socket } from '../../chat/socket';
import useMessages from '../../../hooks/useMessages';
import { useGetEventConversation } from '../../../hooks/useConversations';
import { useApp } from '../../../stores/app.store';
/*eslint-disable*/
import ConversationMessages from '../../chat/shared/conversation/messages.container';
/*eslint-enable*/

//TODO: Refactor this component to use the new useConnectChatServer hook
// Test if doing another abstraction is worth it
function ChatEventPage({
  parentRef,
  eventId,
}: {
  parentRef: React.RefObject<HTMLDivElement>;
  eventId: number | undefined;
}) {
  const [openMessage, setOpenMessage] = useState(false);
  const { userProfile, userId } = useApp();
  const { data: conversation } = useGetEventConversation({
    eventId,
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

  const handleOpenMessageWindow = () => {
    if (parentRef.current) {
      setOpenMessage(!openMessage);
      parentRef.current.style.overflow = 'hidden';
      parentRef.current.style.height = 'calc(100vh - 80px)';
    }
  };

  const handleCloseMessageWindow = () => {
    if (parentRef.current) {
      setOpenMessage(!openMessage);
      parentRef.current.style.overflow = 'auto';
      parentRef.current.style.height = 'auto';
    }
  };
  return (
    <>
      <div
        className={cn(
          'z-10 hidden ',
          openMessage &&
            `fixed top-20 flex h-body w-full animate-fade-in-right 
             opacity-0 backdrop-blur-md`,
        )}
      >
        <Container
          className="flex h-body flex-grow flex-col justify-between 
         rounded-none p-0"
        >
          {conversation && (
            <header
              className="flex items-center justify-between gap-x-4 border-b
           border-b-grey-light px-4 py-2"
            >
              <div
                className="flex aspect-square cursor-pointer items-center 
              justify-center rounded-full border border-border 
              border-opacity-10 
              p-1.5 text-primary-700 shadow"
                onClick={() =>
                  showConvInfos
                    ? setShowConvInfos(!showConvInfos)
                    : handleCloseMessageWindow()
                }
              >
                <ArrowLeft size={18} />
              </div>

              <ConversationCardImage
                participantsList={conversation.participants_list}
                typeConversation={conversation.type_name}
                currentUserId={userId}
                size={38}
              />
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
          <div
            className="relative flex flex-grow 
          flex-col justify-end overflow-y-auto"
          >
            {showConvInfos && conversation && (
              <ConversationInfos
                conversation={conversation}
                currentUserId={userId}
              />
            )}
            <ConversationMessages
              historicMessages={historicMessages}
              userId={userId}
              userProfile={userProfile}
              conversation={conversation}
            />
          </div>
        </Container>
      </div>
      <div
        onClick={handleOpenMessageWindow}
        className="fixed bottom-2.5 right-2.5 flex h-10 w-10 
        items-center justify-center rounded-full bg-primary-100 lg:hidden"
      >
        <MessageSquare />
      </div>
    </>
  );
}

export default ChatEventPage;
