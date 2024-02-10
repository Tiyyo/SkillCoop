import { useEffect, useState } from 'react';
import { CreateEventStateStore } from '../features/create-event/store/create-event.store';

type UseSelectionOfFriendsProps = {
  activeSelected?: boolean;
  removeFriendFromState?: (friendId: number) => void;
  addFriendToState?: (friendId: number) => void;
  dataFromState?: CreateEventStateStore | null;
  friendId: number;
};

export function useSelectionOfFriends({
  activeSelected,
  removeFriendFromState,
  addFriendToState,
  dataFromState,
  friendId,
}: UseSelectionOfFriendsProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClickEvent = () => {
    if (!activeSelected || !removeFriendFromState || !addFriendToState) return;
    if (isSelected) {
      removeFriendFromState(friendId);
      setIsSelected(false);
    } else {
      addFriendToState(friendId);
    }
  };
  // this is needed to avoid an obscur bug
  // we take on reference data we updated in the store to update the state
  useEffect(() => {
    if (!dataFromState || !dataFromState.participants) return;
    if (dataFromState.participants.find((id) => id === friendId)) {
      setIsSelected(true);
    }
  }, [dataFromState]);
  return { isSelected, handleClickEvent };
}
