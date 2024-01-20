//@ts-nocheck
import { useNavigate, useParams } from 'react-router-dom';
import { useGetConversation } from '../../hooks/useConversations';
import { socket } from './socket';
import { Suspense, useEffect } from 'react';
import { useApp } from '../../store/app.store';
import { MyForm } from './send-form';
import Container from '../../layout/container';
import ConversationCardImage from './image-converasation';
import ConversationCardTitle from './title-conversation';
import { ArrowLeft, Info } from 'lucide-react';
import LoadingPage from '../../component/loading-page';
import useMessages from '../../hooks/useMessages';
import GroupDateMessages from './group-date-messages';

function Conversation() {
  const navigate = useNavigate();
  const params = useParams();
  const { userId, userProfile } = useApp();
  const { data: conversation } = useGetConversation({
    conversationId: Number(params.id),
  });
  const {
    messages: groupByDate,
    displayNewMessage,
    getHistoric,
  } = useMessages();

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
      socket.emit('join_conversation', {
        conversationId: conversation.conversation_id,
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
      // socket.on('historic', getHistoric);
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
        className="lg:mt-4 flex-grow flex flex-col justify-between 
        p-0 h-[calc(100vh-5rem)]"
      >
        {conversation && (
          <header
            className="flex py-2 px-4 items-center gap-x-4 border-b
             border-b-grey-light justify-between"
          >
            <div
              className="p-1.5 aspect-square border flex items-center 
              justify-center rounded-full shadow border-opacity-10 
            text-primary-700 cursor-pointer"
              onClick={() => navigate(-1)}
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
            <Info className="text-primary-100 cursor-pointer" size={20} />
          </header>
        )}
        <main
          className="flex flex-grow flex-col justify-end overflow-hidden 
        bg-[url('/images/chat_bg_2.svg')] py-2 no-scrollbar  overflow-y-auto"
        >
          <div
            className="flex flex-col gap-y-1 
          overflow-y-scroll px-2.5"
          >
            {groupByDate &&
              groupByDate.map((group) => (
                <GroupDateMessages
                  key={group.date}
                  date={group.date}
                  groupAuthor={group.groupAuthor}
                  currentUserId={userId}
                />
              ))}
          </div>
        </main>
        <footer
          className="py-4 border-t 
        border-b-grey-light"
        >
          <MyForm
            conversationId={conversation?.conversation_id}
            userId={userId}
            username={userProfile?.username}
            avatar={userProfile?.avatar_url}
          />
        </footer>
      </Container>
    </Suspense>
  );
}

export default Conversation;
