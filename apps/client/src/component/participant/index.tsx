import { useEffect, useState } from 'react';
import { InvitationStatus } from '../../types';
import { cn } from '../../lib/utils';
import star from '../../assets/svg/star.svg';
import soccerBall from '../../assets/svg/soccer-ball.svg';
import capitalize from '../../utils/capitalize';
import { Link } from 'react-router-dom';
import Avatar from '../avatar';
import { useApp } from '../../store/app.store';
import ParticipantStatusMark from '../status';

interface ParticipantProps {
  avatar: string;
  username: string;
  status: InvitationStatus;
  profileId: number;
  eventStatus?: 'full' | 'open' | 'completed' | 'cancelled' | null;
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
  const { userProfile } = useApp();
  const userProfileId = userProfile?.profile_id;
  const [isChecked, setIsChecked] = useState<boolean>(
    activeId === name + profileId?.toString(),
  );

  useEffect(() => {
    //ensure that the user can't vote for or select himself
    if (profileId === userProfileId) return;
    setIsChecked(activeId === name + profileId?.toString());
  }, [activeId, name, profileId]);

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
            `flex flex-col items-center justify-center py-4 gap-1
            flex-shrink-0 min-w-[160px] min-h-[130px]`,
            isChecked && 'bg-primary-500',
          )}
        >
          {eventStatus === 'completed' && userProfileId !== profileId ? (
            <Link to={`evaluate/${profileId}`}>
              <div className="relative bg-primary-400 h-18.5 w-18.5 rounded-full z-10">
                <div className="rounded-full bottom-1 right-1 h-4 w-4 bg-white absolute z-10">
                  <ParticipantStatusMark status={status} />
                </div>
                <Avatar
                  avatar={avatar}
                  isRatingActive
                  className="h-18 w-18 lg:h-18 lg:w-18 border-2 border-base-light 
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                />
              </div>
            </Link>
          ) : (
            <div className="relative bg-primary-400 h-18.5 w-18.5 rounded-full z-10">
              <div className="rounded-full bottom-1 right-1 h-4 w-4 bg-white absolute z-10">
                <ParticipantStatusMark status={status} />
              </div>
              <Avatar
                avatar={avatar}
                className="h-18 w-18 lg:h-18 lg:w-18 border-2 border-base-light 
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              />
            </div>
          )}
          <legend
            className={cn('mr-2 whitespace-pre font-medium text-sm w-full ')}
          >
            <p className="text-center flex items-center justify-center">
              {capitalize(username)}
            </p>
            <p
              className="mx-0.5 flex justify-center items-center text-xs text-center font-light
               text-grey-sub-text"
            >
              <span>{isAdmin ? 'Organizer' : 'Member'}</span>
              <span>
                {isBestStriker && <img src={soccerBall} className="h-4" />}
              </span>
              <span>{isMvp && <img src={star} className="h-4" />}</span>
            </p>
          </legend>
        </div>
      )}
    </label>
  );
}

export default Participant;
