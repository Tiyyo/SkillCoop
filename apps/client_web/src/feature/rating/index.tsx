import { useMutation } from '@tanstack/react-query';
import ReturnBtn from '../../component/return';
import TitleH2 from '../../component/title-h2';
import { useApp } from '../../store/app.store';
import FieldsetRadioInput from './FieldsetRadioInput';
import { evaluateOwnSkillsFn } from '../../api/authApi';
import schema from 'schema';
import Button from '../../component/button';
import { EvaluationOwnSkill } from '../../types';
import { useEffect, useState } from 'react';
import RadarChart from '../../component/radar-chart';
import associateStringToNumber from '../../utils/associate-string-number';
const { ownSkillSchema } = schema;

export const data = {
  labels: ['defending', 'dribbling', 'passing', 'shooting', 'pace'],
  datasets: [
    {
      data: [70, 45, 65, 85, 98],
      backgroundColor: 'hsla(120, 98.7%, 31.5%, 0.126)',
      borderColor: 'hsla(120, 98.7%, 31.5%, 0.350)',
      borderWidth: 2,
      clip: 10,
      label: 'Distribution of skills',
    },
  ],
};

function UserResumeSkills() {
  const { userProfile } = useApp();
  const [hasSkills, setHasSkills] = useState<boolean>(!!userProfile?.gb_rating);
  const skills = ['defending', 'dribbling', 'passing', 'shooting', 'pace'];
  const [skillValues, setSkillValues] = useState<Record<string, number>>({});
  const { mutate: evaluateSkills } = useMutation((data: EvaluationOwnSkill) =>
    evaluateOwnSkillsFn(data)
  );

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
      !userProfile?.avg_defending ||
      !userProfile?.avg_dribbling ||
      !userProfile?.avg_passing ||
      !userProfile?.avg_shooting ||
      !userProfile?.avg_pace
    )
      return;
    const userSkills = {
      defending: userProfile?.avg_defending,
      dribbling: userProfile?.avg_dribbling,
      passing: userProfile?.avg_passing,
      shooting: userProfile?.avg_shooting,
      pace: userProfile?.avg_pace,
    };
    setSkillValues(userSkills);
  }, []);

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
      {hasSkills && <RadarChart skills={skillValues} />}
    </div>
  );
}

export default UserResumeSkills;
