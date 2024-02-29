import { getFormattedUTCTimestamp } from '@skillcoop/date-handler/src';
import { useUpdateUserOnConversation } from './useConversations';
import { useEffect } from 'react';

type UseConversationProps = {
  conversation: any;
  userId: string | null;
};

export default function useConversation({
  conversation,
  userId,
}: UseConversationProps) {
  const { mutate: updateLastSeenIndicator } = useUpdateUserOnConversation({});
  const todayUTCString = getFormattedUTCTimestamp();
  useEffect(() => {
    if (!conversation || !userId) return;
    updateLastSeenIndicator({
      conversation_id: conversation.conversation_id,
      user_id: userId,
      last_seen: todayUTCString,
    });
  }, [conversation, userId]);
}
