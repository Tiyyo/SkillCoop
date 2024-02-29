import { useEffect, useState } from 'react';
import { InvitationStatus } from '@skillcoop/types/src';
import { cn } from '../../../lib/utils';
import { useApp } from '../../../shared/store/app.store';
import type { EventStatus } from '@skillcoop/types/src';
import ParticipantLegend from './participant-legend';
import ParticipantDispatchAction from './participant-dispatch-action';

type ParticipantProps = {
  avatar: string | null;
  username: string;
  status: InvitationStatus;
  profileId: string;
  eventStatus?: EventStatus | null;
  activeId?: string;
  name?: string;
  profileIsAdmin?: boolean;
  currentUserIsAdmin?: boolean;
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
  profileIsAdmin,
  currentUserIsAdmin,
  isMvp,
  isBestStriker,
}: ParticipantProps) {
  const { userProfile } = useApp();
  const userProfileId = userProfile?.profile_id;
  const [isChecked, setIsChecked] = useState<boolean>(
    activeId === name + profileId?.toString(),
  );

  const forbiddenParticipantStatus = ['declined', 'refused'];

  useEffect(() => {
    //ensure that the user can't vote for or select himself
    if (profileId === userProfileId) return;
    setIsChecked(activeId === name + profileId?.toString());
  }, [activeId, name, profileId]);

  return (
    <label
      htmlFor={name + profileId?.toString()}
      className=" whitespace-normal"
    >
      <input
        type="radio"
        id={name + profileId?.toString()}
        value={profileId}
        name={name}
        hidden
      />
      {!forbiddenParticipantStatus.includes(status) && (
        <div
          className={cn(
            `flex min-h-[130px] min-w-[160px] flex-shrink-0 flex-col 
            items-center justify-center gap-1 py-4`,
            isChecked && 'bg-primary-500',
          )}
        >
          <ParticipantDispatchAction
            eventStatus={eventStatus}
            profileIsAdmin={profileIsAdmin}
            participantStatus={status}
            avatar={avatar}
            profileId={profileId}
            currentUserIsAdmin={currentUserIsAdmin}
          />
          <ParticipantLegend
            profileIsAdmin={profileIsAdmin}
            isMvp={isMvp}
            isBestStriker={isBestStriker}
            status={status}
            username={username}
          />
        </div>
      )}
    </label>
  );
}

export default Participant;
