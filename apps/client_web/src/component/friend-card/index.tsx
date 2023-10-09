import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import defaultAvatar from '../../../public/images/default-avatar.png';
import { acceptOrDeclinedFriendRequestFn } from '../../api/authApi';
import OctogoneCross from '../../assets/icon/OctogoneCross';
import Check from '../../assets/icon/Check';
import schema from 'schema';
import { useFriends } from '../../store/friend.store';
import { EventType, invitationStatus } from '../../types';
import { Link } from 'react-router-dom';
const { updateFriendshipSchema } = schema;

type EventTypeState = EventType & {
  invited_participants_ids: number[];
};

interface FriendCardProps {
  avatar: string;
  username: string;
  adderId: number;
  friendId: number;
  status: string;
  dataFromState?: EventTypeState | null;
  addFriendToState?: (friendId: any) => void;
  removeFriendFromState?: (friendId: any) => void;
  activeSelected?: boolean;
  activeLinkProfile?: boolean;
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
  activeLinkProfile = true,
  dataFromState,
  addFriendToState,
  removeFriendFromState,
}: FriendCardProps) {
  const { mutate: acceptOrDeclinedInvitation } = useMutation(
    ['acceptOrDeclinedInvitation'],
    (data: updateInvitationStatus) => acceptOrDeclinedFriendRequestFn(data)
  );
  const { removePendingFriend, addConfirmedFriend } = useFriends();
  const [isSelected, setIsSelected] = useState(false);

  const handleClickSelectFriend = () => {
    if (!activeSelected || !removeFriendFromState || !addFriendToState) return;
    if (isSelected) {
      removeFriendFromState(friendId);
      setIsSelected(false);
    } else {
      addFriendToState(friendId);
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
    if (!dataFromState || !dataFromState.invited_participants_ids) return;
    if (dataFromState.invited_participants_ids.find((id) => id === friendId)) {
      setIsSelected(true);
    }
  }, [dataFromState]);

  if (status === 'declined') return null;
  return (
    <Link to={activeLinkProfile ? `/contact/profile/${friendId}` : ''}>
      <div
        className={`flex py-2 px-3 gap-3 max-h-16 cursor-pointer rounded-md border-2 border-transparent ${
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
    </Link>
  );
}

export default FriendCard;
