import { useEffect, useState } from 'react';
import { InvitationStatus } from '../../types';
import Status from '../status';
import { cn } from '../../lib/utils';
import star from '../../assets/svg/star.svg';
import soccerBall from '../../assets/svg/soccer-ball.svg';
import capitalize from '../../utils/capitalize';

interface ParticipantProps {
  avatar: string;
  username: string;
  status: InvitationStatus;
  profile_id: number;
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
  profile_id,
  activeId,
  name,
  isAdmin,
  isMvp,
  isBestStriker,
}: ParticipantProps) {
  const [isChecked, setIsChecked] = useState<boolean>(
    activeId === name + profile_id.toString()
  );

  useEffect(() => {
    setIsChecked(activeId === name + profile_id.toString());
  }, [activeId]);

  return (
    <>
      <label htmlFor={name + profile_id.toString()}>
        <input
          type="radio"
          id={name + profile_id.toString()}
          value={profile_id}
          name={name}
          hidden
        />
        {status !== 'declined' && (
          <div
            className={cn(
              'flex flex-col items-center bg-base p-1 gap-1 flex-shrink-0 min-w-[120px] min-h-[120px]',
              isChecked && 'bg-primary-500'
            )}>
            <p className="text-xs flex flex-col items-center py-1">
              <span
                className={cn('mr-2', isAdmin && 'text-primary-900 font-bold')}>
                {capitalize(username)}
              </span>
              <span className="flex py-1">
                {isMvp && (
                  <img
                    src={star}
                    className="relative -top-[1px] h-4"
                  />
                )}
                {isBestStriker && (
                  <img
                    src={soccerBall}
                    className="h-4"
                  />
                )}
              </span>
            </p>
            <img
              src={avatar ? avatar : '/images/default-avatar.png'}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <Status status={status} />
          </div>
        )}
      </label>
    </>
  );
}

export default Participant;
