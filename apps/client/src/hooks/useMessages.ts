import { useState } from 'react';
import {
  AuthorGroupMessages,
  Historic,
  MessageStore,
  Message,
  HistoricMessages,
} from 'packages/types/src';

export function createDateGroup(
  date: string,
  authorGroup: AuthorGroupMessages,
) {
  return {
    date,
    author_groups: [authorGroup],
  };
}

export function createAuthorGroup(message: MessageStore) {
  return {
    user_id: message.user_id,
    username: message.username,
    avatar: message.avatar,
    messages: [createMessage(message)],
  };
}

export function createMessage(message: Message) {
  return {
    message_id: message.message_id,
    message: message.message,
    created_at: message.created_at,
    updated_at: message.updated_at,
  };
}

export function addMessageToAuthorGroup(
  authorGroup: AuthorGroupMessages,
  message: MessageStore,
) {
  authorGroup.messages.push(createMessage(message));
}

function useMessages() {
  const [messages, setMessages] = useState<HistoricMessages>([]);
  function displayNewMessage(newMessage: MessageStore) {
    setMessages((prev) => {
      const newMessageDate = new Date(newMessage.created_at).toLocaleString(
        'en-US',
        {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          timeZone: 'UTC',
        },
      );
      const lastDateGroup = prev.length > 0 ? prev[prev.length - 1] : null;
      if (lastDateGroup && lastDateGroup.date === newMessageDate) {
        const lastAuthorGroup =
          lastDateGroup.author_groups[lastDateGroup.author_groups.length - 1];
        if (lastAuthorGroup.user_id === newMessage.user_id) {
          addMessageToAuthorGroup(lastAuthorGroup, newMessage);
          return [...prev.slice(0, -1), { ...lastDateGroup }];
        } else {
          return [
            ...prev.slice(0, -1),
            {
              ...lastDateGroup,
              author_groups: [
                ...lastDateGroup.author_groups,
                createAuthorGroup(newMessage),
              ],
            },
          ];
        }
      } else {
        return [
          ...prev,
          createDateGroup(newMessageDate, createAuthorGroup(newMessage)),
        ];
      }
    });
  }

  function getHistoric(payload: Historic) {
    setMessages(payload.messages);
  }
  return { displayNewMessage, getHistoric, messages };
}
export default useMessages;
