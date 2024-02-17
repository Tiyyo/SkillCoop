import { createInvitationSchema } from '@skillcoop/schema/src';
/* eslint-disable */
import { useFriends as useFriendStore } from '../../../features/friends/store/friend.store';
import toast from '../../utils/toast';
import associateNumberToString from '../../utils/associate-number-string-scale';
import { useInviteFriend } from '../../../features/friends/hooks/useFriends';
import AvatarWithBorder from '../avatar/avatar-border';
import capitalize from '../../utils/capitalize';
import { useTranslation } from 'react-i18next';
/* eslint-enable */

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
  const { t } = useTranslation('skill');
  const translateSkillEvaluation =
    lastEvaluationRecorded &&
    t(associateNumberToString(lastEvaluationRecorded));

  const { mutate: sendInvitation } = useInviteFriend({
    onSuccess: () => {
      toast.invitationSent(t('toast:invitationSentTo', { username }));
      removeSearchProfile(username);
    },
    onError: () => {
      toast.error(t('toast:thereIsAlreadyPendingRequest'));
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
      toast.error(t('system:somethingWentWrong'));
      return;
    }
    sendInvitation(data);
  };

  if (relation) return null;
  return (
    <div>
      <div
        className={`flex w-full min-w-[150px] cursor-pointer 
        flex-col items-center rounded-md  border-primary-20 px-3 py-2`}
      >
        <AvatarWithBorder avatar={avatar} />
        <p className="py-1 text-relative-sm font-medium">
          {capitalize(username)}
        </p>
        <p>
          <span>{lastEvaluationRecorded && translateSkillEvaluation}</span>
          {!relation && (
            <button
              type="button"
              onClick={handleActionInviation}
              className="mx-1 cursor-pointer rounded-md bg-primary-400
              px-2 py-1 text-center text-xs shadow-md transition-all 
              duration-300 ease-in-out hover:bg-primary-700"
            >
              {t('system:invite')}
            </button>
          )}
        </p>
      </div>
    </div>
  );
}

export default ProfileCard;
