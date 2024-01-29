import { ConversationParticipant } from '@skillcoop/types';
import { cn } from '../../../lib/utils';

type ConversationCardTitleProps = {
  title: string | null;
  currentUserId: number | null;
  classname?: string;
  participantsList: ConversationParticipant[];
};

function ConversationCardTitle({
  title,
  currentUserId,
  participantsList,
  classname,
}: ConversationCardTitleProps) {
  const participantsName = participantsList
    .filter((p) => p.user_id !== currentUserId)
    .map((p) => p.username)
    .join(', ');

  return (
    <h3
      className={cn(
        `my-0.5 line-clamp-1 max-w-[250px] text-ellipsis text-sm font-medium`,
        classname,
      )}
    >
      {title ? title : participantsName}
    </h3>
  );
}

export default ConversationCardTitle;
