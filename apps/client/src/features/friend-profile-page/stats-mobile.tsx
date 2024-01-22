import associateNumberToString from '../../utils/associate-number-stringscale';
import capitalize from '../../utils/capitalize';
import { sumValues } from '../../utils/sum-values';

type FriendStatsMobileProps = {
  nbAttendedEvent?: number | null;
  nbMvpBonus?: number | null;
  nbReview?: number | null;
  nbBestStrikerBonus?: number | null;
  lastEvaluation?: number | null;
};

function FriendStatsMobile({
  nbAttendedEvent,
  nbMvpBonus,
  nbReview,
  nbBestStrikerBonus,
  lastEvaluation,
}: FriendStatsMobileProps) {
  return (
    <div
      className="md:hidden flex-grow flex flex-col 
      gap-y-0.5 text-xs text-light px-6"
    >
      <p>
        Attented to{' '}
        <span className="font-semibold">{nbAttendedEvent ?? 0}</span> event(s)
      </p>
      <p>
        Received{' '}
        <span className="font-semibold">
          {sumValues(nbMvpBonus, nbReview, nbBestStrikerBonus)}
        </span>{' '}
        rating or bonus
      </p>

      <p>
        Average skills:{' '}
        <span className="font-semibold">
          {capitalize(associateNumberToString(lastEvaluation ?? 0))}
        </span>
      </p>
    </div>
  );
}

export default FriendStatsMobile;
