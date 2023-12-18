import { createInvitationSchema } from 'schema/ts-schema';
import { useFriends as useFriendStore } from '../../store/friend.store';
import toast from '../../utils/toast';
import associateNumberToString from '../../utils/associate-number-stringscale';
import { useInviteFriend } from '../../hooks/useFriends';
import AvatarWithBorder from '../avatar/avatar-border';
import capitalize from '../../utils/capitalize';

type ProfileCardProps = {
  avatar: string | null;
  username: string;
  profileId: number;
  friendId: number;
  lastEvaluationRecorded?: number;
  relation?: number | null;
  createdAt?: string;
  refetch?: () => void;
};

function ProfileCard({
  avatar,
  username,
  profileId,
  friendId,
  relation,
  lastEvaluationRecorded,
}: ProfileCardProps) {
  const { mutate: sendInvitation } = useInviteFriend({
    onSuccess: () => {
      toast.invitationSent(username);
      removeSearchProfile(username);
    },
    onError: () => {
      toast.error('There already is a pending request');
    },
  });
  const { removeSearchProfile } = useFriendStore();

  const handleActionInviation = () => {
    const data = {
      adder_id: profileId,
      friend_id: friendId,
    };
    const isValid = createInvitationSchema.safeParse(data);
    if (!isValid.success) {
      toast.error('Something went wrong');
      return;
    }
    sendInvitation(data);
  };

  if (relation) return null;
  return (
    <div>
      <div
        className={`flex flex-col items-center py-2 px-3 cursor-pointer
        rounded-md  border-primary-20 min-w-[150px] w-full`}
      >
        <AvatarWithBorder avatar={avatar} />
        <p className="text-relative-sm font-medium py-1">
          {capitalize(username)}
        </p>
        <p>
          <span>
            {lastEvaluationRecorded &&
              associateNumberToString(lastEvaluationRecorded)}
          </span>
          {!relation && (
            <button
              type="button"
              onClick={handleActionInviation}
              className="text-center text-xs mx-1 px-2 py-1 shadow-md 
                    rounded-md bg-primary-400 cursor-pointer hover:bg-primary-700 
                    transition-all duration-300 ease-in-out"
            >
              Invite
            </button>
          )}
        </p>
      </div>
    </div>
  );
}

export default ProfileCard;
