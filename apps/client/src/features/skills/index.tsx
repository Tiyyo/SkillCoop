import TitleH2 from '../../components/title-h2';
import { useApp } from '../../stores/app.store';
import FieldsetRadioInput from './fieldset-radio.input';
import { ownSkillSchema } from '@skillcoop/schema/src';
import Button from '../../components/button';
import { useId } from 'react';
import RadarChart from '../../components/radar-chart';
import { useUserProfileEval } from '../../hooks/useUserProfileEval';
import Spinner from '../../components/loading';
import Container from '../../layouts/container';
import strongbox from '../../assets/svg/strongbox.svg';
import flash from '../../assets/svg/flash.svg';
import reward from '../../assets/svg/reward.svg';
import { sumValues } from '../../utils/sum-values';
import associateNumberToString from '../../utils/associate-number-stringscale';
import { useTranslation } from 'react-i18next';
import { ALL_SKILLS } from '../../constants/skill-constant';
import { LEVEL_SCALE } from '../../constants/skill-constant';

function UserResumeSkills() {
  const { t } = useTranslation('skill');
  const idComp = useId();
  const { userProfile } = useApp();

  const {
    hasBeenEvaluated,
    autoEvaluate,
    skills: skillValues,
    gbRating,
    loading,
  } = useUserProfileEval({
    profileId: userProfile?.profile_id,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userProfile?.profile_id) return;
    const targetInputs = e.target as any;
    const data = {
      defending: targetInputs.defending.value,
      dribbling: targetInputs.dribbling.value,
      passing: targetInputs.passing.value,
      shooting: targetInputs.shooting.value,
      pace: targetInputs.pace.value,
      profile_id: userProfile.profile_id,
    };
    const isValid = ownSkillSchema.safeParse(data);
    if (!isValid.success) return;
    autoEvaluate(data);
  };

  if (loading)
    return (
      <div>
        <Spinner />
      </div>
    );

  return (
    <Container className="flex w-full flex-col gap-y-6 lg:mt-4 lg:flex-row">
      <div className="basis-1/2">
        <TitleH2 title={t('title:stats')} />
        <div className="flex w-full flex-col gap-y-2 py-4 ">
          <div className="flex items-center gap-x-2">
            <img src={flash} className="h-8 rounded-lg bg-primary-100 p-1" />
            <p>
              {t('youHaveProficiency')}{' '}
              <span className="font-semibold text-primary-1100">
                {t(associateNumberToString(gbRating ?? 0))}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <img
              src={strongbox}
              className="h-8 rounded-lg bg-primary-100 p-1"
            />
            <p>
              {t('youAttended')}{' '}
              <span className="font-semibold text-primary-1100">
                {userProfile?.nb_attended_events ?? 0}
              </span>{' '}
              {t('eventPlurial')}
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <img src={reward} className="h-8 rounded-lg bg-primary-100 p-1" />
            <p>
              {t('youReceived')}{' '}
              <span className="font-semibold text-primary-1100">
                {sumValues(
                  userProfile?.nb_mvp_bonus,
                  userProfile?.nb_review,
                  userProfile?.nb_best_striker_bonus,
                )}
              </span>{' '}
              {t('rewardsInclude')}
            </p>
          </div>
        </div>
      </div>
      <div className="basis-1/2">
        <TitleH2
          title={t('title:graphSkillVizualisation')}
          legend={
            !hasBeenEvaluated
              ? t('title:haveNotEvaluatedYet')
              : t('title:graphSkillVizualisationLegend')
          }
        />
        {hasBeenEvaluated ? (
          <div className="max-h-96 py-2 text-center">
            <RadarChart skills={skillValues} min={0} max={100} displayTicks />
          </div>
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center py-4"
            >
              {ALL_SKILLS.map((skill) => (
                <FieldsetRadioInput
                  key={idComp + skill}
                  name={skill}
                  options={LEVEL_SCALE}
                />
              ))}
              <Button
                type="submit"
                textContent={t('event:sendEvaluation')}
                className="my-8 self-center text-sm"
              />
            </form>
          </>
        )}
      </div>
    </Container>
  );
}
export default UserResumeSkills;
