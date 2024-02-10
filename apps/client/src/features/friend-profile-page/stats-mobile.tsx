import { useTranslation } from 'react-i18next';
/*eslint-disable */
import associateNumberToString from '../../shared/utils/associate-number-stringscale';
/*eslint-enable */
import capitalize from '../../shared/utils/capitalize';
import { sumValues } from '../../shared/utils/sum-values';

type FriendStatsMobileProps = {
  nbAttendedEvent?: number | null;
  nbMvpBonus?: number | null;
  nbReview?: number | null;
  nbBestStrikerBonus?: number | null;
  lastEvaluation?: number | null;
  winningRate?: number | null;
};

function FriendStatsMobile({
  nbAttendedEvent,
  nbMvpBonus,
  nbReview,
  nbBestStrikerBonus,
  lastEvaluation,
  winningRate,
}: FriendStatsMobileProps) {
  const { t } = useTranslation('skill');
  return (
    <div
      className="flex flex-grow flex-col gap-y-0.5 
      px-6 text-xs text-light md:hidden"
    >
      <p>
        {t('attendedTo')}{' '}
        <span className="font-semibold">{nbAttendedEvent ?? 0}</span>{' '}
        {t('eventPlurial')}
      </p>
      <p>
        {t('received')}{' '}
        <span className="font-semibold">
          {sumValues(nbMvpBonus, nbReview, nbBestStrikerBonus)}
        </span>{' '}
        {t('ratingOrBonus')}
      </p>

      <p>
        {t('averageSkills')}:{' '}
        <span className="font-semibold">
          {capitalize(associateNumberToString(lastEvaluation ?? 0))}
        </span>
      </p>
      <p>
        {t('winningRate')}:{' '}
        <span className="font-semibold">{winningRate}%</span>
      </p>
    </div>
  );
}

export default FriendStatsMobile;
