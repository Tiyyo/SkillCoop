import {
  useAddParticipantsToConversationGroup,
  useRemoveFromConversationGroup,
} from './useConversations';
import { useGetConfirmedFriends } from '../../friends/hooks/useFriends';
import { ConversationParticipant } from '@skillcoop/types';
import { useRef, useState } from 'react';

type ConversationInfosMembersProps = {
  currentUserId: number | null;
  participantsList: ConversationParticipant[];
  conversationId: number;
};

export default function useInfosMembers({
  conversationId,
  currentUserId,
  participantsList,
}: ConversationInfosMembersProps) {
  const containerRef = useRef<HTMLUListElement>(null);
  const [shouldExpand, setShouldExpand] = useState(false);
  const [searchValue, setSearchValue] = useState('');

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
    profileId: currentUserId!,
  });

  const participantsListIds = participantsList.map((p) => p.user_id);
  const friendsNotInGroup = confirmedFriends
    ?.filter((friend) => {
      return (
        !participantsListIds.includes(friend.friend_id) ||
        friend.friend_id === currentUserId
      );
    })
    .filter((friend) => friend.username.includes(searchValue));

  const handleClickNavigation = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!containerRef.current) return;
    if (e.currentTarget.value === 'right') {
      containerRef.current.scrollLeft += 70;
    } else {
      containerRef.current.scrollLeft -= 70;
    }
  };
  return {
    isAdmin,
    removeUserFromGroup,
    addUsersToGroup,
    participantsListIds,
    friendsNotInGroup,
    handleClickNavigation,
    containerRef,
    shouldExpand,
    setShouldExpand,
    setSearchValue,
  };
}
