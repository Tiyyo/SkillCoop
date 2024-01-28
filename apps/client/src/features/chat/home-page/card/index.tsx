import { Link } from 'react-router-dom';
import ConversationCardImage from '../../image-conversation';
import ConversationCardTitle from '../../title-conversation';
import ConversationCardTimeAgo from './time-ago';
import ConversationCardLastMessage from './last-message';
import { getFormattedUTCTimestamp } from '@skillcoop/date-handler/src';
import NewMessageIndicator from './new-message-indicator';
import { Conversation, UpdateUserOnConversation } from '@skillcoop/types/src';

type ConversationCardProps = {
  currentUserId: number;
  conversation: Conversation;
  updateLastSeen: (data: UpdateUserOnConversation) => void;
};
function ConversationCard({
  conversation,
  currentUserId,
  updateLastSeen,
}: ConversationCardProps) {
  const todayUTCString = getFormattedUTCTimestamp();
  return (
    <Link
      className="flex py-4"
      to={`conversation/${conversation.conversation_id}`}
      onClick={() =>
        updateLastSeen({
          conversation_id: conversation.conversation_id,
          user_id: currentUserId,
          last_seen: todayUTCString,
        })
      }
    >
      <div
        className="relative flex  w-14 
                    flex-shrink-0  items-center 
                    justify-center  text-center text-xs"
      >
        <ConversationCardImage
          participantsList={conversation.participants_list}
          typeConversation={conversation.type_name}
          currentUserId={currentUserId}
        />
      </div>
      <div
        className="flex flex-grow flex-col-reverse 
                    justify-between px-3 py-2"
      >
        {conversation.last_message && (
          <div
            className="flex items-center justify-between gap-1 
          text-sm text-light"
          >
            <ConversationCardLastMessage
              content={conversation.last_message?.content}
            />
            <ConversationCardTimeAgo
              lastMessageDate={conversation.last_message?.created_at}
            />
          </div>
        )}
        <div className="flex justify-between">
          <ConversationCardTitle
            title={conversation.title}
            participantsList={conversation.participants_list}
            currentUserId={currentUserId}
          />
          <NewMessageIndicator
            lastSeen={conversation.last_seen}
            lastUpdate={conversation.last_update}
            isWriteByCurrentUser={
              currentUserId === conversation.last_message?.user_id
            }
          />
        </div>
      </div>
    </Link>
  );
}

export default ConversationCard;
