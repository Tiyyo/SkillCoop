import { Conversation } from '@skillcoop/types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type ConversationInfosLinkProps = {
  conversation: Conversation;
  currentUserId: string | null;
};

function ConversationInfosLink({
  conversation,
  currentUserId,
}: ConversationInfosLinkProps) {
  const { t } = useTranslation('chat');
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
        {t('eventLink')}
      </Link>
    );
  }

  if (conversation.type_name === 'oneToOne' && participantsIds) {
    return (
      <Link
        to={`/contact/profile/${participantsIds[0]}`}
        className="text-sm text-light"
      >
        {t('profile')}
      </Link>
    );
  }
  return null;
}

export default ConversationInfosLink;
