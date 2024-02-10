import { Link } from 'react-router-dom';
import ConversationCardTimeAgo from './card.time-ago';
import ConversationCardLastMessage from './card.last-message';

import NewMessageIndicator from './card.new-message-indicator';
import { Conversation } from '@skillcoop/types/src';
/*eslint-disable */
import ConversationCardImage from '../../../shared/components/conversation-image';
import ConversationCardTitle from '../../../shared/components/conversation-title';
 

type ConversationCardProps = {
  currentUserId: number;
  conversation: Conversation;
};
function ConversationCard({
  conversation,
  currentUserId, // updateLastSeen,
}: ConversationCardProps) {
  return (
    <Link
      className="flex py-4"
      to={`conversation/${conversation.conversation_id}`}
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
