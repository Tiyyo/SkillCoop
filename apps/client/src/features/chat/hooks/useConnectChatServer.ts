import { useEffect, useState } from 'react';
import { useGetConversation } from './useConversations';
import useMessages from './useMessages';
import { socket } from '../../../config/socket';
import { useApp } from '../../../shared/store/app.store';

export default function useConnectChatServer(conversationId: number) {
  const { userProfile, userId } = useApp();
  const { data: conversation } = useGetConversation({
    conversationId: conversationId,
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
      socket.emit('join_conversation', {
        conversation_id: conversation.conversation_id,
      });

      socket.on('connect', connect);
      socket.on('reconnect_attempt', () => {
        // console.log('Attempting to reconnect');
      });
      socket.on('disconnect', () => {
        console.log('Disconnected');
      });
      socket.on('error', () => {
        // console.log('Socket error:', error);
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

  return {
    showConvInfos,
    setShowConvInfos,
    historicMessages,
    conversation,
    userProfile,
    userId,
  };
}
