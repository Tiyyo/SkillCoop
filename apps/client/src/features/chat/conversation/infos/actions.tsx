import { ConversationParticipant, TypeConversation } from '@skillcoop/types';
import InfosActionsLeaveGroup from './actions.leave';
import InfosActionsDeleteGroup from './actions.delete';

type ConversationInfosActionsProps = {
  conversationId: number;
  currentUserId: number | null;
  participantsList: ConversationParticipant[];
  typeConversation: TypeConversation;
};

function ConversationInfosActions({
  conversationId,
  currentUserId,
  typeConversation,
  participantsList,
}: ConversationInfosActionsProps) {
  const isAdmin = !!participantsList.find(
    (p) => p.is_admin === 1 && p.user_id === currentUserId,
  );

  return (
    <div
      className="flex w-full flex-col items-center justify-center 
      gap-y-3 pt-16"
    >
      {typeConversation !== 'oneToOne' && (
        <InfosActionsLeaveGroup
          conversationId={conversationId}
          currentUserId={currentUserId}
        />
      )}
      {isAdmin && typeConversation === 'group' && (
        <InfosActionsDeleteGroup
          conversationId={conversationId}
          currentUserId={currentUserId}
        />
      )}
    </div>
  );
}

export default ConversationInfosActions;
