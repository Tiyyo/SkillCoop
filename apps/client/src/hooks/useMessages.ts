import { useState } from 'react';
import { MessageReceived, AuthorGroup, Messages } from '../provisional-types';

export function createDateGroup(date: string, authorGroup: AuthorGroup) {
  return {
    date,
    groupAuthor: [authorGroup],
  };
}

export function createAuthorGroup(message: MessageReceived) {
  return {
    user_id: message.user_id,
    username: message.username,
    avatar: message.avatar,
    messages: [createMessage(message)],
  };
}

export function createMessage(message: MessageReceived) {
  return {
    message: message.message,
    created_at: message.created_at,
    updated_at: message.updated_at,
  };
}

export function addMessageToAuthorGroup(
  authorGroup: AuthorGroup,
  message: MessageReceived,
) {
  authorGroup.messages.push(createMessage(message));
}

function useMessages() {
  const [messages, setMessages] = useState<Messages>([]);
  console.log(messages);
  function displayNewMessage(newMessage: MessageReceived) {
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

      // Check if the new message fits in the last date group
      const lastDateGroup = prev.length > 0 ? prev[prev.length - 1] : null;
      if (lastDateGroup && lastDateGroup.date === newMessageDate) {
        const lastAuthorGroup =
          lastDateGroup.groupAuthor[lastDateGroup.groupAuthor.length - 1];
        if (lastAuthorGroup.user_id === newMessage.user_id) {
          // Add to existing author group
          addMessageToAuthorGroup(lastAuthorGroup, newMessage);
          return [...prev.slice(0, -1), { ...lastDateGroup }];
        } else {
          // Create new author group in the last date group
          return [
            ...prev.slice(0, -1),
            {
              ...lastDateGroup,
              groupAuthor: [
                ...lastDateGroup.groupAuthor,
                createAuthorGroup(newMessage),
              ],
            },
          ];
        }
      } else {
        // Create new date group
        return [
          ...prev,
          createDateGroup(newMessageDate, createAuthorGroup(newMessage)),
        ];
      }
    });
  }

  function getHistoric(payload: { messages: any; conversation_id: number }) {
    setMessages(payload.messages);
  }
  return { displayNewMessage, getHistoric, messages };
}
export default useMessages;
