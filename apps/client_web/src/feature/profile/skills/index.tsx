import { useMutation, useQuery } from '@tanstack/react-query';
import ReturnBtn from '../../../component/return';
import TitleH2 from '../../../component/title-h2';
import { useApp } from '../../../store/app.store';
import FieldsetRadioInput from './fieldset-radio.input';
import { evaluateOwnSkillsFn, getProfileEvalFn } from '../../../api/api.fn';
import schema from 'schema';
import Button from '../../../component/button';
import { EvaluationOwnSkill } from '../../../types';
import { useEffect, useState } from 'react';
import RadarChart from '../../../component/radar-chart';
import associateStringToNumber from '../../../utils/associate-string-number';
import associateNumberToString from '../../../utils/associate-number-stringscale';
import capitalize from '../../../utils/capitalize';
const { ownSkillSchema } = schema;

function UserResumeSkills() {
  const { userProfile } = useApp();
  const [hasSkills, setHasSkills] = useState<boolean>(!!userProfile?.gb_rating);
  const skills = ['defending', 'dribbling', 'passing', 'shooting', 'pace'];
  const [skillValues, setSkillValues] = useState<Record<string, number>>({});
  const { mutate: evaluateSkills } = useMutation((data: EvaluationOwnSkill) =>
    evaluateOwnSkillsFn(data)
  );
  const { data: profileEval, isLoading } = useQuery(['profileEval'], () => {
    if (!userProfile?.profile_id) return;
    return getProfileEvalFn(userProfile?.profile_id);
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
    evaluateSkills(data);
    // if success
    setHasSkills(true);
    setSkillValues((prev) => ({
      ...prev,
      defending: associateStringToNumber(data.defending),
      dribbling: associateStringToNumber(data.dribbling),
      passing: associateStringToNumber(data.passing),
      shooting: associateStringToNumber(data.shooting),
      pace: associateStringToNumber(data.pace),
    }));
    // update states
  };

  useEffect(() => {
    if (
      !profileEval?.avg_defending ||
      !profileEval?.avg_dribbling ||
      !profileEval?.avg_passing ||
      !profileEval?.avg_shooting ||
      !profileEval?.avg_pace
    )
      return;
    const userSkills = {
      defending: profileEval?.avg_defending,
      dribbling: profileEval?.avg_dribbling,
      passing: profileEval?.avg_passing,
      shooting: profileEval?.avg_shooting,
      pace: profileEval?.avg_pace,
    };
    setHasSkills(true);
    setSkillValues(userSkills);
  }, [isLoading]);

  const nbGratification =
    userProfile?.nb_review +
    userProfile?.nb_bonus.nb_mvp_bonus +
    userProfile?.nb_bonus.nb_best_striker_bonus;

  return (
    <div>
      <ReturnBtn />
      <TitleH2 value="Your skills" />
      {!hasSkills && (
        <>
          <p className="text-sm px-4 italic">
            You haven't estimated your skills yet. Estimating your skills allows
            the algorithm to more accurately match users during event
            matchmaking.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col py-4">
            {skills.map((skill) => (
              <FieldsetRadioInput
                name={skill}
                options={[
                  'beginner',
                  'novice',
                  'intermediate',
                  'advanced',
                  'expert',
                ]}
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
      {hasSkills && (
        <>
          <div className="text-xs text-light px-4">
            <p>
              You have participed to{' '}
              <span className="font-semibold">
                {userProfile?.nb_attended_events ?? 0}
              </span>{' '}
              event(s)
            </p>
            <p>
              You received{' '}
              <span className="font-semibold">{nbGratification ?? 0} </span>{' '}
              rating or bonus
            </p>

            <p>
              Here is your average skills:{' '}
              <span className="font-semibold">
                {capitalize(
                  associateNumberToString(userProfile?.gb_rating as number)
                )}
              </span>
            </p>
          </div>
          <RadarChart
            skills={skillValues}
            min={0}
            max={100}
            displayTicks
          />
        </>
      )}
    </div>
  );
}

export default UserResumeSkills;
