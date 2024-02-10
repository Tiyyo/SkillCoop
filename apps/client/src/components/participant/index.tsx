import { useEffect, useState } from 'react';
import { InvitationStatus } from '@skillcoop/types/src';
import { cn } from '../../lib/utils';
import star from '../../assets/svg/star.svg';
import soccerBall from '../../assets/svg/soccer-ball.svg';
import capitalize from '../../utils/capitalize';
import { Link } from 'react-router-dom';
import Avatar from '../avatar';
import { useApp } from '../../shared/store/app.store';
import ParticipantStatusMark from '../status';
import type { EventStatus } from '@skillcoop/types/src';
import { useTranslation } from 'react-i18next';

type ParticipantProps = {
  avatar: string | null;
  username: string;
  status: InvitationStatus;
  profileId: number;
  eventStatus?: EventStatus | null;
  activeId?: string;
  name?: string;
  isAdmin?: boolean;
  isMvp?: boolean;
  isBestStriker?: boolean;
};

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
  const { t } = useTranslation('event');
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
            `flex min-h-[130px] min-w-[160px] flex-shrink-0 flex-col 
            items-center justify-center gap-1 py-4`,
            isChecked && 'bg-primary-500',
          )}
        >
          {eventStatus === 'completed' && userProfileId !== profileId ? (
            <Link to={`evaluate/${profileId}`}>
              <div
                className="relative z-10 h-18.5 w-18.5 
                rounded-full bg-primary-400"
              >
                <div
                  className="absolute bottom-1 right-1 z-10 h-4 
                w-4 rounded-full bg-white"
                >
                  <ParticipantStatusMark status={status} />
                </div>
                <Avatar
                  avatar={avatar}
                  isRatingActive
                  className="absolute left-1/2 top-1/2 h-18 w-18 
                -translate-x-1/2 -translate-y-1/2 rounded-full border-2 
                border-base-light lg:h-18 lg:w-18"
                  size={72}
                />
              </div>
            </Link>
          ) : (
            <div
              className="relative z-10 h-18.5 w-18.5 
              rounded-full bg-primary-400"
            >
              <div
                className="absolute bottom-1 right-1 z-10 h-4 
              w-4 rounded-full bg-white"
              >
                <ParticipantStatusMark status={status} />
              </div>
              <Avatar
                avatar={avatar}
                className="absolute left-1/2 top-1/2 h-18 w-18 -translate-x-1/2 
                -translate-y-1/2 rounded-full border-2 border-base-light 
                lg:h-18 lg:w-18"
                size={72}
              />
            </div>
          )}
          <legend
            className={cn('mr-2 w-full whitespace-pre text-sm font-medium ')}
          >
            <p className="flex items-center justify-center text-center">
              {capitalize(username)}
            </p>
            <p
              className="mx-0.5 flex items-center justify-center 
              text-center text-xs font-light
               text-grey-sub-text"
            >
              <span>{isAdmin ? t('organizer') : t('member')}</span>
              <span>
                {isBestStriker && <img src={soccerBall} className="h-4" />}
              </span>
              <span className="relative -top-[2px] flex items-center">
                {isMvp && <img src={star} className="h-4" />}{' '}
              </span>
            </p>
          </legend>
        </div>
      )}
    </label>
  );
}

export default Participant;
