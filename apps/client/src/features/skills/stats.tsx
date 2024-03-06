import TitleH2 from '../../shared/components/title-h2';
import strongbox from '../../assets/svg/strongbox.svg';
import flash from '../../assets/svg/flash.svg';
import reward from '../../assets/svg/reward.svg';
import cup from '../../assets/cup.png';
import { sumValues } from '../../shared/utils/sum-values';
/*eslint-disable */
import associateNumberToString from '../../shared/utils/associate-number-string-scale';
/*eslint-enable */
import StatWrapper from './layout/stat-wrapper';
import { useTranslation } from 'react-i18next';
import { formatPrice } from '../../shared/utils/format-price';

type ProfileStatsProps = {
  gbRating: number | null | undefined;
  nbAttendedEvents: number | null | undefined;
  winningRate: number | null | undefined;
  nbMvpBonus: number | null | undefined;
  nbReview: number | null | undefined;
  nbBestStrikerBonus: number | null | undefined;
};

function ProfileStats({
  gbRating,
  nbAttendedEvents,
  winningRate,
  nbMvpBonus,
  nbReview,
  nbBestStrikerBonus,
}: ProfileStatsProps) {
  const { t } = useTranslation('skill');
  return (
    <>
      <TitleH2 title={t('title:stats')} />
      <div className="flex w-full flex-col gap-y-2 py-4 text-light">
        <StatWrapper icon={flash}>
          <p>
            {t('youHaveProficiency')}{' '}
            <span className="font-semibold text-primary-1100">
              {t(associateNumberToString(gbRating ?? 0))}
            </span>
          </p>
        </StatWrapper>
        <StatWrapper icon={strongbox}>
          <p>
            {t('youAttended')}{' '}
            <span className="font-semibold text-primary-1100">
              {nbAttendedEvents ?? 0}
            </span>{' '}
            {t('eventPlurial')}
          </p>
        </StatWrapper>
        <StatWrapper icon={cup}>
          <p>
            {t('winningRate')}{' '}
            <span className="font-semibold text-primary-1100">
              {formatPrice(winningRate) ?? 0}%
            </span>
          </p>
        </StatWrapper>
        <StatWrapper icon={reward}>
          <p>
            {t('youReceived')}{' '}
            <span className="font-semibold text-primary-1100">
              {sumValues(nbMvpBonus, nbReview, nbBestStrikerBonus)}
            </span>{' '}
            {t('rewardsInclude')}
          </p>
        </StatWrapper>
      </div>
    </>
  );
}

export default ProfileStats;
