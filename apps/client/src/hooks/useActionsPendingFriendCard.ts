import { AxiosResponse } from 'axios';
import { useFriends } from '../store/friend.store';
import { useFriendInvitationActions } from './useFriends';
import toast from '../utils/toast';
import { InvitationStatus, invitationStatus } from '../types';
import { updateFriendshipSchema } from 'schema/ts-schema';

interface useActionsPendingFriendCardProps {
  friendId: number;
  username: string;
  avatar: string;
  adderId: number;
}

export function useActionsPendingFriendCard({
  friendId,
  username,
  avatar,
  adderId,
}: useActionsPendingFriendCardProps) {
  //store
  const { removePendingFriend, addConfirmedFriend } = useFriends();
  const { mutate: respondToInvitation } = useFriendInvitationActions({
    onSuccess: (response: AxiosResponse) => {
      if (response.data.status === 'confirmed') {
        const friend = {
          friend_id: friendId,
          username: username,
          avatar_url: avatar,
          status_name: invitationStatus.confirmed,
          adder_id: adderId,
        };
        addConfirmedFriend(friend);
        toast.addFriend(response.data.username);
      }
      removePendingFriend(username);
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });
  const handleActionOnInviation = (e: React.MouseEvent<HTMLButtonElement>) => {
    const action = e.currentTarget.value as InvitationStatus;
    const data = {
      adder_id: adderId,
      friend_id: friendId,
      status_name: action,
      username: username,
    };
    const isValid = updateFriendshipSchema.safeParse(data);
    if (!isValid.success) return;
    respondToInvitation(data);
  };
  return { handleActionOnInviation };
}