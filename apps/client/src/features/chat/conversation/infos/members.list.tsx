/*eslint-disable*/
import { X } from 'lucide-react';
import ImageWithUsernamefallback from '../../../../shared/components/image-fallback-username';
import { ConversationParticipant, TypeConversation } from '@skillcoop/types';
/*eslint-enable*/

type InfosMembersListProps = {
  participants: ConversationParticipant[];
  remove: (value: any) => void;
  conversationId: number;
  isAdmin: boolean;
  typeConversation: TypeConversation;
  currentUserId: string;
};

function InfosMembersList({
  participants,
  remove,
  conversationId,
  isAdmin,
  typeConversation,
  currentUserId,
}: InfosMembersListProps) {
  return (
    <>
      {participants &&
        participants.length > 0 &&
        participants
          .filter((p) => p.user_id !== currentUserId)
          .map((participant) => (
            <li
              key={participant.user_id}
              className="w-10 flex-shrink-0 animate-circle-fade-in
                 py-4 opacity-0"
            >
              <div className="relative h-10 w-10">
                <ImageWithUsernamefallback
                  avatar={participant.avatar}
                  username={participant.username}
                />
                {isAdmin && typeConversation === 'group' && (
                  <button>
                    <X
                      className="absolute -bottom-1 -right-1 cursor-pointer 
                          rounded-full bg-grey-constrast bg-opacity-80 p-0.5 
                        text-dark"
                      size={16}
                      onClick={() =>
                        remove({
                          conversation_id: conversationId,
                          participant_id: participant.user_id,
                        })
                      }
                    />
                  </button>
                )}
              </div>
              <p className="py-0.5 text-center text-xxs">
                {participant.username}
              </p>
            </li>
          ))}
    </>
  );
}

export default InfosMembersList;
