import Container from '../../shared/layouts/container';
import associateNumberToString from '../../utils/associate-number-stringscale';
import capitalize from '../../utils/capitalize';
import { sumValues } from '../../utils/sum-values';
import { useTranslation } from 'react-i18next';

type ProfileSkillsResumeProps = {
  username: string;
  nbAtentedEvents: number | undefined;
  nbMvpBonus: number | undefined;
  nbReview: number | undefined;
  nbBestStrikerBonus: number | undefined;
  lastEvaluation: number | undefined;
};

export default function ProfileSkillsResume({
  username,
  nbAtentedEvents,
  nbMvpBonus,
  nbReview,
  nbBestStrikerBonus,
  lastEvaluation,
}: ProfileSkillsResumeProps) {
  const { t } = useTranslation('skill');
  const translatedSkill = t(associateNumberToString(lastEvaluation ?? 0));
  return (
    <Container>
      <div className="flex flex-col gap-y-0.5 px-4 text-xs text-light">
        <p>
          <span>{capitalize(username)}</span> {t('haveParticipedTo')}{' '}
          <span className="font-semibold">{nbAtentedEvents ?? 0}</span>{' '}
          {t('event:event')}
        </p>
        <p>
          <span>{capitalize(username)}</span> {t('received')}{' '}
          <span className="font-semibold">
            {sumValues(nbMvpBonus, nbReview, nbBestStrikerBonus)}
          </span>{' '}
          {t('ratingOrBonus')}
        </p>

        <p>
          {t('hereIs')} <span>{username}</span> {t('averageSkills')}:{' '}
          <span className="font-semibold">{translatedSkill}</span>
        </p>
      </div>
    </Container>
  );
}
