import ParticipantRole from '../participant-role';
import star from '../../../assets/svg/star.svg';
import capitalize from '../../utils/capitalize';
import soccerBall from '../../../assets/svg/soccer-ball.svg';
import { cn } from '../../../lib/utils';
import { InvitationStatus } from '@skillcoop/types/src';

type ParticipantLegendProps = {
  profileIsAdmin: boolean | undefined;
  isMvp: boolean | undefined;
  isBestStriker: boolean | undefined;
  status: InvitationStatus;
  username: string;
};

function ParticipantLegend({
  profileIsAdmin,
  isMvp,
  isBestStriker,
  status,
  username,
}: ParticipantLegendProps) {
  return (
    <legend className={cn('mr-2 w-full whitespace-pre text-sm font-medium ')}>
      <p className="flex items-center justify-center text-center">
        {capitalize(username)}
      </p>
      <p
        className="mx-0.5 flex items-center justify-center 
              text-center text-xs font-light
               text-grey-sub-text"
      >
        <ParticipantRole isAdmin={profileIsAdmin} participantStatus={status} />
        <span>{isBestStriker && <img src={soccerBall} className="h-4" />}</span>
        <span className="relative -top-[2px] flex items-center">
          {isMvp && <img src={star} className="h-4" />}{' '}
        </span>
      </p>
    </legend>
  );
}

export default ParticipantLegend;
