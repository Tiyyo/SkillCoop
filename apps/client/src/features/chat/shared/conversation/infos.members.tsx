import { ConversationParticipant, TypeConversation } from '@skillcoop/types';
/* eslint-disable-next-line */
import ImageWithUsernamefallback from '../../../../components/image-fallback-username/index';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import {
  useAddParticipantsToConversationGroup,
  useRemoveFromConversationGroup,
} from '../../../../hooks/useConversations';
import { useGetConfirmedFriends } from '../../../../hooks/useFriends';
import { useRef, useState } from 'react';

type ConversationInfosMembersProps = {
  typeConversation: TypeConversation;
  currentUserId: number | null;
  participantsList: ConversationParticipant[];
  conversationId: number;
};

function ConversationInfosMembers({
  typeConversation,
  currentUserId,
  participantsList,
  conversationId,
}: ConversationInfosMembersProps) {
  if (typeConversation === 'oneToOne' || !currentUserId) return null;
  const containerRef = useRef<HTMLUListElement>(null);
  const [shouldDispplayFriends, setShouldDisplayFriends] = useState(false);
  const [searchFriendsValue, setSearchFriendsValue] = useState('');
  const isAdmin = !!participantsList.find(
    (p) => p.is_admin === 1 && p.user_id === currentUserId,
  );
  const { mutate: removeUserFromGroup } = useRemoveFromConversationGroup({
    conversationId,
  });
  const { mutate: addUsersToGroup } = useAddParticipantsToConversationGroup({
    conversationId,
  });
  const { data: confirmedFriends } = useGetConfirmedFriends({
    profileId: currentUserId,
  });

  const participantsListIds = participantsList.map((p) => p.user_id);
  const friendsNotInGroup = confirmedFriends
    ?.filter((friend) => {
      return (
        !participantsListIds.includes(friend.friend_id) ||
        friend.friend_id === currentUserId
      );
    })
    .filter((friend) => friend.username.includes(searchFriendsValue));

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!containerRef.current) return;
    if (e.currentTarget.value === 'right') {
      containerRef.current.scrollLeft += 70;
    } else {
      containerRef.current.scrollLeft -= 70;
    }
  };

  return (
    <>
      <div
        className="w-full overflow-x-auto 
       border-b border-b-grey-sub-text border-opacity-20 py-4"
      >
        <div className="flex justify-between">
          <p className="text-xs font-medium text-primary-1100">Members</p>
          <button
            className="text-xs font-medium text-primary-1100"
            onClick={() => setShouldDisplayFriends(!shouldDispplayFriends)}
          >
            Add <span>{shouldDispplayFriends ? '-' : '+'}</span>
          </button>
        </div>
        <ul
          ref={containerRef}
          className="no-scrollbar grid w-full grid-flow-col 
          justify-start gap-x-10 overflow-x-auto scroll-smooth px-6 py-3"
        >
          {participantsList &&
            participantsList.length > 0 &&
            participantsList
              .filter((p) => p.user_id !== currentUserId)
              .map((participant) => (
                <li
                  className="w-10 flex-shrink-0 animate-circle-fade-in
                 py-4 opacity-0"
                >
                  <div className="relative h-10 w-10">
                    <ImageWithUsernamefallback
                      avatar={participant.avatar}
                      username={participant.username}
                    />
                    {isAdmin && (
                      <button>
                        <X
                          className="absolute -bottom-1 -right-1 cursor-pointer 
                    rounded-full bg-grey-constrast bg-opacity-80 p-0.5 
                  text-dark"
                          size={16}
                          onClick={() =>
                            removeUserFromGroup({
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
        </ul>
        <div className="hidden justify-between lg:flex">
          <button onClick={handleClick} value="left">
            <ChevronLeft
              size={14}
              className="aspect-square rounded-full bg-grey-off
             text-primary-100"
            />
          </button>
          <button onClick={handleClick} value="right">
            <ChevronRight
              size={14}
              className="aspect-square rounded-full bg-grey-off
             text-primary-100"
            />
          </button>
        </div>
      </div>
      {shouldDispplayFriends && (
        <div className="h-0 w-full animate-open-vertical overflow-y-hidden">
          <input
            type="text"
            placeholder="Search friends"
            className=" my-2 h-9 w-4/5 border-b bg-transparent text-xs 
          transition-colors duration-100 focus:border-b-2 
          focus:border-b-primary-500 focus:outline-none"
            onChange={(e) => setSearchFriendsValue(e.target.value)}
          />
          <ul
            className="no-scrollbar flex h-64 w-full
          flex-col gap-y-2 overflow-y-scroll px-1.5 pb-20 pt-3"
          >
            {friendsNotInGroup &&
              friendsNotInGroup.length > 0 &&
              friendsNotInGroup.map((friend) => (
                <li className="flex items-center justify-between ">
                  <div className="flex items-center gap-x-4">
                    <div className="relative h-10 w-10">
                      <ImageWithUsernamefallback
                        avatar={friend.avatar_url}
                        username={friend.username}
                      />
                    </div>
                    <p className="py-0.5 text-center text-xxs">
                      {friend.username}
                    </p>
                  </div>
                  <button
                    className="text-xs font-medium text-primary-1100"
                    onClick={() =>
                      addUsersToGroup({
                        participants_ids: [friend.friend_id],
                        conversation_id: conversationId,
                      })
                    }
                  >
                    Add +
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default ConversationInfosMembers;
