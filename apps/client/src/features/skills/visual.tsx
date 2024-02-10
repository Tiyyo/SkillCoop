import TitleH2 from '../../components/title-h2';
import RadarChart from '../../components/radar-chart';
import { useTranslation } from 'react-i18next';
import EvaluationSkillForm from './visual.form';
import { Skills } from '@skillcoop/types/src';

type ProfileSkillVisualizationProps = {
  hasBeenEvaluated: boolean;
  skillValues: Skills | null;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

function ProfileSkillVisualization({
  hasBeenEvaluated,
  skillValues,
  handleSubmit,
}: ProfileSkillVisualizationProps) {
  const { t } = useTranslation('skill');
  return (
    <>
      {' '}
      <TitleH2
        title={t('title:graphSkillVizualisation')}
        legend={
          !hasBeenEvaluated
            ? t('title:haveNotEvaluatedYet')
            : t('title:graphSkillVizualisationLegend')
        }
      />
      {hasBeenEvaluated ? (
        <div
          className="flex max-h-96 justify-center py-2 
            text-center"
        >
          <RadarChart skills={skillValues} min={0} max={100} displayTicks />
        </div>
      ) : (
        <EvaluationSkillForm handleSubmit={handleSubmit} />
      )}
    </>
  );
}

export default ProfileSkillVisualization;
