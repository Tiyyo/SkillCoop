import { Conversation } from '@skillcoop/types';
import { Link } from 'react-router-dom';

type ConversationInfosLinkProps = {
  conversation: Conversation;
  currentUserId: number | null;
};

function ConversationInfosLink({
  conversation,
  currentUserId,
}: ConversationInfosLinkProps) {
  //TODO wrap in a useMemo if causes performance issues
  const participantsIds = conversation?.participants_list
    .filter((p) => p.user_id !== currentUserId)
    .map((p) => p.user_id);

  if (conversation.type_name === 'event' && conversation.event_id) {
    return (
      <Link
        to={`/event/${conversation.event_id}`}
        className="text-sm text-light"
      >
        Event Link
      </Link>
    );
  }

  if (conversation.type_name === 'oneToOne' && participantsIds) {
    return (
      <Link
        to={`/contact/profile/${participantsIds[0]}`}
        className="text-sm text-light"
      >
        Profile
      </Link>
    );
  }
  return null;
}

export default ConversationInfosLink;
