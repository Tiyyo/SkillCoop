import { EventStatus, InvitationStatus } from '@skillcoop/types/src';
import { Link } from 'react-router-dom';
import ParticipantAvatar from './participant-avatar';

type ParticipantHandlerActionProps = {
  eventStatus: EventStatus | null;
  profileIsAdmin: boolean | undefined;
  participantStatus: InvitationStatus;
  avatar: string | null;
  profileId: string;
  currentUserIsAdmin: boolean | undefined;
};

function ParticipantDispatchAction({
  eventStatus,
  profileIsAdmin,
  participantStatus,
  avatar,
  profileId,
  currentUserIsAdmin,
}: ParticipantHandlerActionProps) {
  if (eventStatus === 'completed' && !profileIsAdmin) {
    return (
      <Link to={`evaluate/${profileId}`}>
        <ParticipantAvatar
          status={participantStatus}
          isRatingActive
          avatar={avatar}
        />
      </Link>
    );
  }
  if (currentUserIsAdmin && participantStatus === 'requested') {
    return (
      <Link to={`request/${profileId}`}>
        <ParticipantAvatar status={participantStatus} avatar={avatar} />
      </Link>
    );
  }
  return <ParticipantAvatar status={participantStatus} avatar={avatar} />;
}

export default ParticipantDispatchAction;
