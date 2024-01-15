import { useEffect } from 'react';
import { MyForm } from './send-form';
import { socket } from './socket';

function Chat({ username = 'Username' }) {
  function connect() {
    socket.connect();
    socket.emit('username', username);
  }

  useEffect(() => {
    function onDisconnect(cause: string) {
      console.log('cause', cause);
      if (cause === 'io server disconnect') {
        socket.connect();
      }
    }

    function displayNewMessage(value: any) {
      console.log(value);
    }

    if (username) {
      socket.emit('username', username);
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

    socket.on('new-message', displayNewMessage);
    // socket.on('history', getHistory);

    return () => {
      socket.off('connect', connect);
      socket.off('disconnect', onDisconnect);
      socket.off('new-message', displayNewMessage);
      // socket.off('history', getHistory);
    };
  }, [username]);

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
        {/* <div className="flex flex-col gap-y-1 
          overflow-y-scroll py-3 pl-8 pr-3">
          {messages.map((message: ChatMessage, index: number) => {
            let sameDate = false;
            let sameAuthor = false;
            if (index >= 1) {
              sameDate = isDatesAreEquals(
                message.date,
                messages[index - 1].date,
              );
              sameAuthor = message.userId === messages[index - 1].userId;
            }
            return (
              <Message
                messageInfos={message}
                user={user}
                displayDateMessage={sameDate}
                displayAuthor={sameAuthor}
              />
            );
          })}
        </div> */}
      </main>

      <footer
        className="border-secondary-400 bg-primary-400 
        h-20 border-t border-opacity-30"
      >
        <MyForm />
      </footer>
      {/* <ConnectionState isConnected={isConnected} /> */}
      {/* <Events events={messages} /> */}
      {/* <ConnectionManager user={user} /> */}
    </>
  );
}

export default Chat;
