import { useEffect, useState } from 'react';
import { InvitationStatus } from '../../types';
import Status from '../status';
import { cn } from '../../lib/utils';

interface ParticipantProps {
  avatar: string;
  username: string;
  status: InvitationStatus;
  profile_id: number;
  activeId?: string;
  name?: string;
}

function Participant({
  avatar,
  username,
  status,
  profile_id,
  activeId,
  name,
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
              'flex flex-col items-center bg-base p-1 gap-1 flex-shrink-0 min-w-[120px]',
              isChecked && 'bg-primary-500'
            )}>
            <p className="text-xs">{username}</p>
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
