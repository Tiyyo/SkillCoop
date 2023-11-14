import { useMutation } from '@tanstack/react-query';
import defaultAvatar from '../../../public/images/default-avatar.png';
import { sendFriendRequestFn } from '../../api/api.fn';
import { createInvitationSchema } from 'schema/ts-schema';
import { useFriends } from '../../store/friend.store';
import toast from '../../utils/toast';
import associateNumberToString from '../../utils/associate-number-stringscale';
import { useEffect } from 'react';

interface ProfileCardProps {
  avatar: string | null;
  username: string;
  profileId: number;
  friendId: number;
  lastEvaluationRecorded?: number;
  relation?: number | null;
  createdAt?: string;
  refetch?: () => void;
}

interface CreateInvitation {
  adder_id: number;
  friend_id: number;
}

function ProfileCard({
  avatar,
  username,
  profileId,
  friendId,
  relation,
  lastEvaluationRecorded,
}: ProfileCardProps) {
  const {
    mutate: sendInvitation,
    isError,
    isSuccess,
    isLoading,
    isFetching,
  } = useMutation(['sendFriendRequest'], (data: CreateInvitation) =>
    sendFriendRequestFn(data),
  );
  const { removeSearchProfile } = useFriends();
  const handleActionInviation = () => {
    const data = {
      adder_id: profileId,
      friend_id: friendId,
    };
    //@ts-ignore
    const isValid = createInvitationSchema.safeParse(data);
    if (!isValid.success) {
      toast.error('Something went wrong');
      return;
    }
    sendInvitation(data);
    if (isError) {
      toast.error('There already is a pending request');
    }
    toast.invitationSent(username);
    removeSearchProfile(username);
  };

  if (relation) return null;
  return (
    <div
      className={`flex py-2 px-3 gap-3 cursor-pointer bg-base-light rounded-md border-2 border-transparent`}
    >
      <img
        src={avatar ?? defaultAvatar}
        alt="avatar"
        className="w-10 h-10 rounded-full"
      />
      <div className="flex flex-col">
        <p className="text-xs">{username}</p>
        <div className="flex items-baseline gap-x-3">
          <p className="text-xxs text-light">
            {lastEvaluationRecorded
              ? associateNumberToString(lastEvaluationRecorded)
              : ''}
          </p>
          {!relation ? (
            <div onClick={handleActionInviation}>
              <button className="text-xs mx-1 px-2 py-1 shadow-md rounded-md bg-primary-400 cursor-pointer hover:bg-primary-700 transition-all duration-300 ease-in-out">
                Invite
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
