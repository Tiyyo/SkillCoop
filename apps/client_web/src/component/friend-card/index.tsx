import { useMutation } from '@tanstack/react-query';
import { useCreateEvent } from '../../store/create-event.store';
import { useEffect, useState } from 'react';
import defaultAvatar from '../../../public/images/default-avatar.png';
import { acceptOrDeclinedFriendRequestFn } from '../../api/authApi';
import OctogoneCross from '../../assets/icon/OctogoneCross';
import Check from '../../assets/icon/Check';
import schema from 'schema';
import { useFriends } from '../../store/friend.store';
import { invitationStatus } from '../../types';
const { updateFriendshipSchema } = schema;

interface FriendCardProps {
  avatar: string;
  username: string;
  adderId: number;
  friendId: number;
  status: string;
  activeSelected?: boolean;
  createdAt?: string;
}

interface updateInvitationStatus {
  adder_id: number;
  friend_id: number;
  status_name: string;
}

function FriendCard({
  avatar,
  username,
  adderId,
  friendId,
  status,
  activeSelected,
}: FriendCardProps) {
  const { mutate: acceptOrDeclinedInvitation } = useMutation(
    ['acceptOrDeclinedInvitation'],
    (data: updateInvitationStatus) => acceptOrDeclinedFriendRequestFn(data)
  );
  const { addInvitedParticipantsIds, removeInvitedParticipantsIds, data } =
    useCreateEvent();
  const { removePendingFriend, addConfirmedFriend } = useFriends();
  const [isSelected, setIsSelected] = useState(false);

  const handleClickSelectFriend = () => {
    if (!activeSelected) return;
    if (isSelected) {
      removeInvitedParticipantsIds(friendId);
      setIsSelected(false);
    } else {
      addInvitedParticipantsIds(friendId);
    }
  };

  const handleActionOnInviation = (e: any) => {
    const action = e.currentTarget.value;
    const data = {
      adder_id: adderId,
      friend_id: friendId,
      status_name: action,
    };
    const isValid = updateFriendshipSchema.safeParse(data);
    if (!isValid.success) {
      // toast.error(isValid.error.message)
      return;
    }
    acceptOrDeclinedInvitation(data);

    removePendingFriend(username);
    if (action === 'confirmed') {
      const friend = {
        friend_id: friendId,
        username: username,
        avatar_url: avatar,
        status_name: invitationStatus.confirmed,
        adder_id: adderId,
      };
      addConfirmedFriend(friend);
    }
  };

  useEffect(() => {
    if (!data || !data.invited_participants_ids) return;
    if (data.invited_participants_ids.find((id) => id === friendId)) {
      setIsSelected(true);
    }
  }, [data]);

  if (status === 'declined') return null;
  return (
    <div
      className={`flex py-2 px-3 gap-3 cursor-pointer rounded-md border-2 border-transparent ${
        isSelected
          ? ' border-opacity-50 border-primary-400 bg-primary-500 shadow-2xl'
          : 'bg-base-light'
      }}`}
      onClick={handleClickSelectFriend}>
      <img
        src={avatar ?? defaultAvatar}
        alt="avatar"
        className="w-10 h-10 rounded-full"
      />
      <div className="flex flex-col gap-2">
        <p className="text-xs">{username}</p>
        <div className="flex items-center gap-x-3">
          <p className="text-xxs text-light">Level</p>
          {status === 'pending' ? (
            <div className="flex items-center gap-1.5">
              <button
                value="declined"
                className="text-error"
                onClick={handleActionOnInviation}>
                <OctogoneCross />
              </button>
              <button
                value="confirmed"
                className="text-primary-900"
                onClick={handleActionOnInviation}>
                <Check />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default FriendCard;
