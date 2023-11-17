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
    <div>
      <ReturnBtn />
      <TitleH2 value="Your skills" />
      {!hasBeenEvaluated && (
        <>
          <p className="text-sm px-4 italic">
            You haven't estimated your skills yet. Estimating your skills allows
            the algorithm to more accurately match users during event
            matchmaking.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col py-4">
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
      <>
        <ProfileSkillsResume
          username={userProfile?.username}
          nbAtentedEvents={userProfile?.nb_attended_events}
          nbMvpBonus={userProfile?.nb_mvp_bonus}
          nbReview={userProfile?.nb_review}
          nbBestStrikerBonus={userProfile?.nb_best_striker_bonus}
          lastEvaluation={gbRating}
        />
      </>
      {hasBeenEvaluated && (
        <RadarChart skills={skillValues} min={0} max={100} displayTicks />
      )}
    </div>
  );
}
export default UserResumeSkills;
