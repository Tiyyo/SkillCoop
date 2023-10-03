import { InvitationStatus } from '../../types';
import Status from '../status';

interface ParticipantProps {
  avatar: string;
  username: string;
  status: InvitationStatus;
}

function Participant({ avatar, username, status }: ParticipantProps) {
  return (
    <>
      {status !== 'declined' && (
        <div className="flex flex-col items-center bg-base p-1 gap-1 flex-shrink-0 min-w-[120px]">
          <p className="text-xs">{username}</p>
          <img
            src={avatar ? avatar : '/images/default-avatar.png'}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <Status status={status} />
        </div>
      )}
    </>
  );
}

export default Participant;
