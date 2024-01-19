import { Link } from 'react-router-dom';
import ConversationCardImage from './image-converasation';
import ConversationCardTitle from './title-conversation';
import ConversationCardTimeAgo from './conversation-card-time-age';
import ConversationCardLastMessage from './last-message-conversation';

type ConversationParticipant = {
  user_id: string;
  username: string;
  avatar: string | null;
};

type Conversation = {
  conversation_id: number;
  title: string | null;
  type_name: 'oneToOne' | 'group' | 'event';
  participants_list: Array<ConversationParticipant>;
  last_message: {
    content: string;
    created_at: string;
  };
};

type ConversationCardProps = {
  currentUserId: number;
  conversation: Conversation;
};
function ConversationCard({
  conversation,
  currentUserId,
}: ConversationCardProps) {
  return (
    <Link
      className="flex py-4"
      to={`conversation/${conversation.conversation_id}`}
    >
      <div
        className="relative flex  w-14 
                    flex-shrink-0  text-center 
                    text-xs  items-center justify-center"
      >
        <ConversationCardImage
          participantsList={conversation.participants_list}
          typeConversation={conversation.type_name}
          currentUserId={currentUserId}
        />
      </div>
      <div
        className="flex flex-grow flex-col-reverse 
                    justify-between py-2 px-3"
      >
        <div
          className="flex items-center text-sm gap-1 
          justify-between text-light"
        >
          <ConversationCardLastMessage
            content={conversation.last_message.content}
          />
          <ConversationCardTimeAgo
            lastMessageDate={conversation.last_message.created_at}
          />
        </div>
        <ConversationCardTitle
          title={conversation.title}
          participantsList={conversation.participants_list}
          currentUserId={currentUserId}
        />
      </div>
    </Link>
  );
}

export default ConversationCard;
