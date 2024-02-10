import RadarChart from '../../shared/components/radar-chart';
import Container from '../../shared/layouts/container';
import TitleH2 from '../../shared/components/title-h2';
import { useTranslation } from 'react-i18next';

type FriendProfileStatsVisualizationProps = {
  evaluateProfile: Record<string, number>;
  maxValue?: number | null;
};

function FriendProfileStatsVisualization({
  evaluateProfile,
  maxValue,
}: FriendProfileStatsVisualizationProps) {
  const { t } = useTranslation('title');

  return (
    <Container className="lg:w-1/2 lg:rounded-r-none">
      <TitleH2 title={t('graphSkillVizualisation')} />
      <div className="flex max-h-96 justify-center">
        <RadarChart
          skills={evaluateProfile}
          min={0}
          // set the scale to a max of the highest score of an user
          // to have a consistent scale
          max={maxValue ? maxValue + 10 : 100}
          displayTicks={false}
        />
      </div>
    </Container>
  );
}

export default FriendProfileStatsVisualization;
