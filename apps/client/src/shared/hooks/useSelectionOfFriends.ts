import { useEffect, useState } from 'react';
/*eslint-disable */
import { CreateEventStateStore } from '../../features/create-event/store/create-event.store';
/*eslint-enable */

type UseSelectionOfFriendsProps = {
  activeSelected?: boolean;
  removeFriendFromState?: (friendId: string) => void;
  addFriendToState?: (friendId: string) => void;
  dataFromState?: CreateEventStateStore | null;
  friendId: string;
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
