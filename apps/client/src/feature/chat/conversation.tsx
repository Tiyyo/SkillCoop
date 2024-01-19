import { useParams } from 'react-router-dom';
import { useGetConversation } from '../../hooks/useConversations';
import { socket } from './socket';
import { useEffect, useState } from 'react';
import { useApp } from '../../store/app.store';
import { MyForm } from './send-form';
import Message from './message';

function Conversation() {
  const params = useParams();
  const { userId, userProfile } = useApp();
  const { data: conversation } = useGetConversation({
    conversationId: Number(params.id),
  });
  const [messages, setMessages] = useState();

  function connect() {
    socket.connect();
    socket.emit('username', userProfile?.username);
  }

  function getHistoric(payload: { messages: any; conversation_id: number }) {
    console.log(payload.messages[0]);
    setMessages(payload.messages);
  }

  useEffect(() => {
    function onDisconnect(cause: string) {
      console.log('cause', cause);
      if (cause === 'io server disconnect') {
        socket.connect();
      }
    }

    function displayNewMessage(newMessage: any) {
      console.log(newMessage);
      setMessages((prev) => [...prev, newMessage]);
    }

    if (conversation) {
      socket.emit('join_conversation', {
        conversationId: conversation.conversation_id,
      });
    }
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
    // socket.on('history', getHistory);

    return () => {
      socket.off('connect', connect);
      socket.off('disconnect', onDisconnect);
      socket.off('new-message', displayNewMessage);
      // socket.off('history', getHistory);
    };
  }, [userProfile?.username, conversation]);

  return (
    <>
      <header
        className="bg-primary-400 text-accent-200 flex h-14 items-center 
        border-b border-opacity-30 px-4"
      ></header>
      <main
        className="flex h-[80%] flex-grow flex-col justify-end overflow-hidden 
        bg-[url('/chat_bg_2.svg')] py-2"
      >
        <div
          className="flex flex-col gap-y-1 
          overflow-y-scroll py-3 pl-8 pr-3"
        >
          {messages &&
            messages.length > 0 &&
            messages.map((message: any, index: number) => {
              // let sameDate = false;
              // let sameAuthor = false;
              // if (index >= 1) {
              //   sameDate = isDatesAreEquals(
              //     message.date,
              //     messages[index - 1].date,
              //   );
              //   sameAuthor = message.userId === messages[index - 1].userId;
              // }
              return (
                <Message
                  // messageInfos={message}
                  key={index}
                  messageId={message.message_id ?? null}
                  content={message.message}
                  avatar={message.avatar}
                  date={message.created_at}
                  senderId={message.user_id}
                  username={message.username}
                  // user={user}
                  // displayDateMessage={sameDate}
                  // displayAuthor={sameAuthor}
                />
              );
            })}
        </div>
      </main>

      <footer
        className="border-secondary-400 bg-primary-400 
        h-20 border-t border-opacity-30"
      >
        <MyForm
          conversationId={conversation?.conversation_id}
          userId={userId}
          username={userProfile?.username}
          avatar={userProfile?.avatar_url}
        />
      </footer>
      {/* <ConnectionState isConnected={isConnected} /> */}
      {/* <Events events={messages} /> */}
      {/* <ConnectionManager user={user} /> */}
    </>
  );
}

export default Conversation;
