import { useState } from 'react';
import { EventType } from '../types';

type EventTypeState = EventType & {
  participants: number[];
};

interface UseSelectionOfFriendsProps {
  activeSelected?: boolean;
  removeFriendFromState?: (friendId: number) => void;
  addFriendToState?: (friendId: number) => void;
  dataFromState?: EventTypeState | null;
  friendId: number;
}

export function useSelectionOfFriends({
  activeSelected,
  removeFriendFromState,
  addFriendToState,
  friendId,
}: UseSelectionOfFriendsProps) {
  const [isSelected, setIsSelected] = useState(false);
  const handleClickEvent = () => {
    if (!activeSelected || !removeFriendFromState || !addFriendToState) return;
    if (isSelected) {
      removeFriendFromState(friendId);
    } else {
      addFriendToState(friendId);
    }
    setIsSelected(!isSelected);
  };
  // commented because suspecting this is not needed
  // useEffect(() => {
  //   if (!dataFromState || !dataFromState.participants) return;
  //   if (dataFromState.participants.find((id) => id === friendId)) {
  //     setIsSelected(true);
  //   }
  // }, [dataFromState])
  return { isSelected, handleClickEvent };
}
