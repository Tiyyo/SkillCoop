import { InvitationStatus } from '@skillcoop/types/src';
import questionMark from '../../assets/svg/question-mark-13228.svg';
/* eslint-disable max-len */
import confirmedMark from '../../assets/svg/green-check-mark-correct-tick-16237.svg';
/* eslint-enable max-len */

type StatusProps = {
  status: InvitationStatus;
  className?: string;
};

function ParticipantStatusMark({ status }: StatusProps) {
  const displayParticipantStatusMark = (status: InvitationStatus) => {
    if (status === 'pending') return questionMark;
    if (status === 'confirmed') return confirmedMark;
  };
  return (
    <img
      src={displayParticipantStatusMark(status)}
      alt="participant status mark"
    />
  );
}

export default ParticipantStatusMark;
