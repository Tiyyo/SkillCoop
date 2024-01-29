import associateNumberToString from '../../utils/associate-number-stringscale';
import { sumValues } from '../../utils/sum-values';
import StatBadge from './stat-badge';
import strongbox from '../../assets/svg/strongbox.svg';
import flash from '../../assets/svg/flash.svg';
import reward from '../../assets/svg/reward.svg';
import { useTranslation } from 'react-i18next';

type FriendStatsDesktopProps = {
  nbAttendedEvent: number | null;
  nbMvpBonus: number | null;
  nbReview: number | null;
  nbBestStrikerBonus: number | null;
  lastEvaluation: number | null;
};

function FriendStatsDesktop({
  nbAttendedEvent,
  nbMvpBonus,
  nbReview,
  nbBestStrikerBonus,
  lastEvaluation,
}: Partial<FriendStatsDesktopProps>) {
  const { t } = useTranslation('skill');
  return (
    <ul className="hidden items-center gap-x-5 md:flex">
      {/* <StatBadge label="Winning Rate" icon={cup} /> */}
      <StatBadge
        label={t('attendance')}
        value={nbAttendedEvent}
        icon={strongbox}
      />
      <StatBadge
        label={t('averageRating')}
        value={t(associateNumberToString(lastEvaluation ?? 0))}
        icon={flash}
      />
      <StatBadge
        label={t('awards')}
        value={sumValues(nbMvpBonus, nbReview, nbBestStrikerBonus)}
        icon={reward}
      />
    </ul>
  );
}

export default FriendStatsDesktop;
