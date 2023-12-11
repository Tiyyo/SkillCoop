import OctogoneCross from '../../assets/icon/OctogoneCross';
import Check from '../../assets/icon/Check';
import { EventType, invitationStatus } from '../../types/index';
import { Link } from 'react-router-dom';
import associateNumberToString from '../../utils/associate-number-stringscale';
import capitalize from '../../utils/capitalize';
import Avatar from '../avatar';
import { useActionsPendingFriendCard } from '../../hooks/useActionsPendingFriendCard';
import { useSelectionOfFriends } from '../../hooks/useSelectionOfFriends';

type EventTypeState = EventType & {
  participants: number[];
};

type FriendCardProps = {
  avatar: string;
  username: string;
  adderId: number;
  friendId: number;
  status: string;
  lastEvaluationRecorded?: number | null;
  dataFromState?: EventTypeState | null;
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
  dataFromState,
  lastEvaluationRecorded,
  addFriendToState,
  removeFriendFromState,
}: FriendCardProps) {
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
      dataFromState,
      activeSelected,
    });

  if (status === 'declined') return null;
  return (
    <Link
      to={activeLinkProfile ? `/contact/profile/${friendId}` : ''}
      className="basis-52"
    >
      <div
        className={`flex py-2 px-3 gap-3 max-h-16 cursor-pointer 
          rounded-md border-2 border-transparent ${
            isSelected
              ? ' border-opacity-50 border-primary-400 bg-primary-500 shadow-2xl'
              : 'bg-base-light'
          }}`}
        onClick={handleClickSelectFriend}
      >
        <Avatar avatar={avatar} />
        <div className="flex flex-col gap-2">
          <p className="text-xs">{username}</p>
          <div className="flex items-center gap-x-3">
            <p className="text-xxs text-light">
              {lastEvaluationRecorded &&
                capitalize(associateNumberToString(lastEvaluationRecorded))}
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
