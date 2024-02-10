import OctogoneCross from '../../../assets/icon/OctogoneCross';
import Check from '../../../assets/icon/Check';
import { invitationStatus } from '@skillcoop/types/src';
import { Link } from 'react-router-dom';
/* eslint-disable */
import associateNumberToString from '../../../shared/utils/associate-number-stringscale';
import { useActionsPendingFriendCard } from '../../../features/friends/hooks/useActionsPendingFriendCard';
import { useSelectionOfFriends } from '../../../shared/hooks/useSelectionOfFriends';
import { CreateEventStateStore } from '../../../features/create-event/store/create-event.store';
import { EventStateStore } from '../../../features/event-page/store/event.store';
import AvatarSmallWithBorder from '../avatar/avatar-border-small';
import { cn } from '../../../lib/utils';
import { useTranslation } from 'react-i18next';
/* eslint-enable */

type FriendCardProps = {
  avatar: string;
  username: string;
  adderId: number;
  friendId: number;
  status: string;
  lastEvaluationRecorded?: number | null;
  dataFromState?: CreateEventStateStore | EventStateStore | null;
  addFriendToState?: (friendId: any) => void;
  removeFriendFromState?: (friendId: any) => void;
  activeSelected?: boolean;
  activeLinkProfile?: boolean;
  createdAt?: string;
};

function FriendCard({
  avatar,
  username,
  adderId,
  friendId,
  status,
  activeSelected,
  activeLinkProfile = false,
  lastEvaluationRecorded,
  addFriendToState,
  removeFriendFromState,
}: FriendCardProps) {
  const { t } = useTranslation('skill');
  const translateSkillEvaluation =
    lastEvaluationRecorded &&
    t(associateNumberToString(lastEvaluationRecorded));
  // Accept or decline invitation
  const { handleActionOnInviation } = useActionsPendingFriendCard({
    friendId,
    adderId,
    username,
    avatar,
  });

  // handle selection of friends to invite to event
  const { isSelected, handleClickEvent: handleClickSelectFriend } =
    useSelectionOfFriends({
      friendId,
      addFriendToState,
      removeFriendFromState,
      activeSelected,
    });

  if (status === 'declined') return null;
  return (
    <Link
      to={activeLinkProfile ? `/contact/profile/${friendId}` : ''}
      className="basis-52"
    >
      <div
        className={cn(
          `flex cursor-pointer flex-col items-center gap-3 rounded-md  border-2 
          border-transparent px-3 py-2`,
          isSelected &&
            ' border-primary-400 border-opacity-50 bg-primary-500 shadow-2xl',
          !isSelected && 'bg-base-light',
        )}
        onClick={handleClickSelectFriend}
      >
        <AvatarSmallWithBorder avatar={avatar} />
        <div className="flex flex-col gap-1">
          <p className="text-center text-xs">{username}</p>
          <div className="flex items-center justify-center gap-x-2">
            <p className="text-center text-xxs text-light">
              {lastEvaluationRecorded && translateSkillEvaluation}
            </p>
            {status === 'pending' && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  value={invitationStatus.declined}
                  className="text-error"
                  onClick={handleActionOnInviation}
                >
                  <OctogoneCross />
                </button>
                <button
                  type="button"
                  value={invitationStatus.confirmed}
                  className="text-primary-900"
                  onClick={handleActionOnInviation}
                >
                  <Check />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FriendCard;
