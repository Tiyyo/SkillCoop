import associateNumberToString from '../../utils/associate-number-stringscale';
import capitalize from '../../utils/capitalize';
import { sumValues } from '../../utils/sum-values';
import StatBadge from './stat-badge';
import strongbox from '../../assets/svg/strongbox.svg';
import flash from '../../assets/svg/flash.svg';
import reward from '../../assets/svg/reward.svg';

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
  return (
    <ul className="hidden md:flex items-center gap-x-5">
      {/* <StatBadge label="Winning Rate" icon={cup} /> */}
      <StatBadge label="Attendance" value={nbAttendedEvent} icon={strongbox} />
      <StatBadge
        label="Average Skill"
        value={capitalize(associateNumberToString(lastEvaluation ?? 0))}
        icon={flash}
      />
      <StatBadge
        label="Awards"
        value={sumValues(nbMvpBonus, nbReview, nbBestStrikerBonus)}
        icon={reward}
      />
    </ul>
  );
}

export default FriendStatsDesktop;
