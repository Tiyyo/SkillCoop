import { useEffect, useState } from 'react';
import { InvitationStatus } from '../../types';
import Status from '../status';
import { cn } from '../../lib/utils';
import star from '../../assets/svg/star.svg';
import soccerBall from '../../assets/svg/soccer-ball.svg';
import capitalize from '../../utils/capitalize';
import { Dialog, DialogContent, DialogTrigger } from '../../lib/ui/dialog';
import ModalRatingParticipant from '../modal-rating-participant';
import { useApp } from '../../store/app.store';
import { useLocation } from 'react-router-dom';

interface ParticipantProps {
  avatar: string;
  username: string;
  status: InvitationStatus;
  profileId: number;
  activeId?: string;
  name?: string;
  isAdmin?: boolean;
  isMvp?: boolean;
  isBestStriker?: boolean;
  isRatingActive?: boolean;
}

function Participant({
  avatar,
  username,
  status,
  profileId,
  activeId,
  name,
  isAdmin,
  isMvp,
  isBestStriker,
  isRatingActive = true,
}: ParticipantProps) {
  const [isChecked, setIsChecked] = useState<boolean>(
    activeId === name + profileId?.toString()
  );
  const { userProfile } = useApp();
  const location = useLocation();
  const eventId = location.state.eventId;
  const userConnecteProfileId = userProfile?.profile_id;

  useEffect(() => {
    setIsChecked(activeId === name + profileId?.toString());
  }, [activeId]);

  return (
    <>
      <label htmlFor={name + profileId?.toString()}>
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
            <Dialog>
              <DialogTrigger disabled={userConnecteProfileId === profileId}>
                <img
                  src={avatar ? avatar : '/images/default-avatar.png'}
                  alt="avatar"
                  className={cn(
                    'w-8 h-8 rounded-full',
                    isRatingActive && 'cursor-pointer'
                  )}
                />
              </DialogTrigger>
              <DialogContent className="bg-base-light">
                <ModalRatingParticipant
                  eventId={eventId}
                  participantProfileId={profileId}
                  participantUsername={username}
                  participantAvatar={avatar}
                />
              </DialogContent>
            </Dialog>
            <Status status={status} />
          </div>
        )}
      </label>
    </>
  );
}

export default Participant;
