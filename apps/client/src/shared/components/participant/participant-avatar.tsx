import ParticipantStatusMark from '../status';
import Avatar from '../avatar';
import { InvitationStatus } from '@skillcoop/types/src';

type ParticipantAvatarProps = {
  avatar: string | null;
  isRatingActive?: boolean;
  status: InvitationStatus;
};

function ParticipantAvatar({
  avatar,
  isRatingActive,
  status,
}: ParticipantAvatarProps) {
  return (
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
        isRatingActive={isRatingActive}
      />
    </div>
  );
}

export default ParticipantAvatar;
