import { useEffect, useState } from 'react';
import { InvitationStatus } from '../../types';
import Status from '../status';
import { cn } from '../../lib/utils';
import star from '../../assets/svg/star.svg';
import soccerBall from '../../assets/svg/soccer-ball.svg';
import capitalize from '../../utils/capitalize';
import { Link } from 'react-router-dom';
import Avatar from '../avatar';

interface ParticipantProps {
  avatar: string;
  username: string;
  status: InvitationStatus;
  profileId: number;
  eventStatus?: 'full' | 'open' | 'completed' | 'cancelled';
  activeId?: string;
  name?: string;
  isAdmin?: boolean;
  isMvp?: boolean;
  isBestStriker?: boolean;
}

function Participant({
  avatar,
  username,
  status,
  profileId,
  activeId,
  name,
  eventStatus = 'open',
  isAdmin,
  isMvp,
  isBestStriker,
}: ParticipantProps) {
  const [isChecked, setIsChecked] = useState<boolean>(
    activeId === name + profileId?.toString(),
  );

  useEffect(() => {
    setIsChecked(activeId === name + profileId?.toString());
  }, [activeId, name, profileId]);

  console.log('Is admin :', username, isAdmin);
  return (
    <label htmlFor={name + profileId?.toString()} className="whitespace-normal">
      <input
        type="radio"
        id={name + profileId?.toString()}
        value={profileId}
        name={name}
        hidden
      />
      {status !== 'declined' && (
        <div
          className={cn(
            'flex flex-col items-center bg-base p-1 gap-1 flex-shrink-0 min-w-[120px] min-h-[120px]',
            isChecked && 'bg-primary-500',
          )}
        >
          <p className="text-xs flex flex-col items-center py-1">
            <span
              className={cn(
                'mr-2 whitespace-pre',
                isAdmin && 'text-primary-900 font-bold',
              )}
            >
              {capitalize(username)}
              <span className="mx-0.5 text-xxs font-normal">
                {isAdmin && '(Organizer)'}
              </span>
            </span>
            <span className="flex py-1">
              {isMvp && <img src={star} className="relative -top-[1px] h-4" />}
              {isBestStriker && <img src={soccerBall} className="h-4" />}
            </span>
          </p>
          {eventStatus === 'completed' ? (
            <Link to={`evaluate/${profileId}`}>
              <Avatar avatar={avatar} isRatingActive />
            </Link>
          ) : (
            <Avatar avatar={avatar} />
          )}
          <Status status={status} />
        </div>
      )}
    </label>
  );
}

export default Participant;
