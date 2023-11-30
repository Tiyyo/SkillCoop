//@ts-nocheck
import ReturnBtn from '../../../component/return';
import TitleH2 from '../../../component/title-h2';
import { useApp } from '../../../store/app.store';
import FieldsetRadioInput from './fieldset-radio.input';
import { ownSkillSchema } from 'schema/ts-schema';
import Button from '../../../component/button';
import { useId } from 'react';
import RadarChart from '../../../component/radar-chart';
import { useUserProfileEval } from '../../../hooks/useUserProfileEval';
import ProfileSkillsResume from '../../../component/profile-skills-resume';
import Spinner from '../../../component/loading';
import Container from '../../../layout/container';
import strongbox from '../../../assets/svg/strongbox.svg';
import flash from '../../../assets/svg/flash.svg';
import reward from '../../../assets/svg/reward.svg';
import capitalize from '../../../utils/capitalize';
import associateNumberToString from '../../../utils/associate-number-stringscale';
import { sumValues } from '../../../utils/sum-values';

function UserResumeSkills() {
  const idComp = useId();
  const { userProfile } = useApp();
  const ALL_SKILLS = ['defending', 'dribbling', 'passing', 'shooting', 'pace'];
  const LEVEL_SCALE = [
    'beginner',
    'novice',
    'intermediate',
    'advanced',
    'expert',
  ];

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
    <Container className="w-full flex flex-col lg:flex-row lg:mt-4 gap-y-6">
      <div className="basis-1/2">
        <TitleH2 title="Stats" />
        <div className="flex flex-col py-4 gap-y-2 w-full ">
          <div className="flex items-center gap-x-2">
            <img src={flash} className="bg-primary-100 h-8 p-1 rounded-lg" />
            <p>
              You have an{' '}
              <span className="font-semibold text-primary-1100">
                {capitalize(associateNumberToString(gbRating ?? 0))}
              </span>
              -level proficiency estimate.
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <img
              src={strongbox}
              className="bg-primary-100 h-8 p-1 rounded-lg"
            />
            <p>
              You attended{' '}
              <span className="font-semibold text-primary-1100">
                {userProfile?.nb_attended_events ?? 0}
              </span>{' '}
              event(s)
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <img src={reward} className="bg-primary-100 h-8 p-1 rounded-lg" />
            <p>
              You received{' '}
              <span className="font-semibold text-primary-1100">
                {sumValues(
                  userProfile?.nb_mvp_bonus,
                  userProfile?.nb_review,
                  userProfile?.nb_best_striker_bonus,
                )}
              </span>{' '}
              rewards, which may include bonuses or ratings.
            </p>
          </div>
        </div>
      </div>
      <div className="basis-1/2">
        <TitleH2
          title="Graph Skill Visualization"
          legend={
            !hasBeenEvaluated
              ? `You haven't estimated your skills yet. Estimating your skills
              allows the algorithm to more accurately match users during event
              matchmaking.`
              : ''
          }
        />
        {hasBeenEvaluated ? (
          <div className="py-2 max-h-96 text-center">
            <RadarChart skills={skillValues} min={0} max={100} displayTicks />
          </div>
        ) : (
          <>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col py-4 items-center"
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
                textContent="Send evaluation"
                className="text-sm my-8 self-center"
              />
            </form>
          </>
        )}
      </div>
    </Container>
  );
}
export default UserResumeSkills;
