import { useEffect, useState } from 'react';
import { EventParticipant, invitationStatus } from '../types/index';
import { EventStateStore } from '../store/event.store';
import { CreateEventStateStore } from '../store/create-event.store';


type UseSelectionOfFriendsProps = {
  activeSelected?: boolean;
  removeFriendFromState?: (friendId: number) => void
  addFriendToState?: (participant: EventParticipant | number) => void;
  dataFromState?: EventStateStore | CreateEventStateStore | null
  friendId: number;
  username: string;
  avatar: string;
}

// need to get username, avatar, 

export function useSelectionOfFriends({
  activeSelected,
  removeFriendFromState,
  addFriendToState,
  dataFromState,
  friendId,
  username,
  avatar,
}: UseSelectionOfFriendsProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClickEvent = () => {
    if (!activeSelected || !removeFriendFromState || !addFriendToState) return;
    if (isSelected) {
      removeFriendFromState(friendId);
      setIsSelected(false);
    } else {
      const updatedParticipantInfos = {
        profile_id: friendId,
        username: username,
        avatar: avatar ?? null,
        status: invitationStatus.pending,
      }
      addFriendToState(updatedParticipantInfos);

    }
  };
  // this is needed to avoid an obscur bug
  // we take on reference data we updated in the store to update the state
  useEffect(() => {
    if (!dataFromState ||
      !dataFromState.participants ||
      dataFromState.participants.length === 0) return;

    if (typeof dataFromState.participants[0] === 'number'
      && (dataFromState.participants as Array<number>).includes(friendId)) {
      setIsSelected(true);
    }

    if (typeof dataFromState.participants[0] !== 'number'
      // Need research on conditional types
      // @ts-ignore
      && dataFromState.staged_participants?.find((p) => p.profile_id === friendId)) {
      setIsSelected(true);
    }
  }, [dataFromState]);
  return { isSelected, handleClickEvent };
}
