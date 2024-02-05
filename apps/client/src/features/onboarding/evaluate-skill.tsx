import { useNavigate, useParams } from 'react-router-dom';
import TitleH2 from '../../components/title-h2';
import Container from '../../layouts/container';
import { cn } from '../../lib/utils';
import FieldsetRadioInput from '../skills/fieldset-radio.input';
import { ALL_SKILLS } from '../../constants/skill-constant';
import { LEVEL_SCALE } from '../../constants/skill-constant';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserProfileEval } from '../../hooks/useUserProfileEval';
import { ownSkillSchema, editProfileInfosSchema } from '@skillcoop/schema/src';
import { useOnboarding } from '../../stores/onboarding.store';
import { useUpdateProfile } from '../../hooks/useProfile';
import toast from '../../utils/toast';
import { useApp } from '../../stores/app.store';

function OnBoardingEvaluateSkill() {
  const navigate = useNavigate();
  const { username, firstname, lastname, date_of_birth, location } =
    useOnboarding();
  const { setIsFirstConnection, setProfile } = useApp();
  const { profileId } = useParams();
  const { t } = useTranslation('skill');

  const { autoEvaluate } = useUserProfileEval({
    profileId: Number(profileId),
    onSuccess: () => {
      toast.success(t('event:evaluationSuccess'));
    },
    onError: () => {
      toast.error('youCantEvaluateTwice');
    },
  });
  const idComp = useId();

  const { mutate: updateProfile } = useUpdateProfile({
    profileId: Number(profileId),
    onSuccess: () => {
      setIsFirstConnection(false);
      setProfile({
        username,
        first_name: firstname,
        last_name: lastname,
        date_of_birth,
        location,
      });
      navigate('/');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!Number(profileId)) return;
    const targetInputs = e.target as any;
    const data = {
      defending: targetInputs.defending.value,
      dribbling: targetInputs.dribbling.value,
      passing: targetInputs.passing.value,
      shooting: targetInputs.shooting.value,
      pace: targetInputs.pace.value,
      profile_id: Number(profileId),
    };
    const isValid = ownSkillSchema.safeParse(data);
    if (!isValid.success) return;
    autoEvaluate(data);
  };

  const validateOnBoarding = () => {
    if (!username || username.length < 3) return;
    const userProfileData = {
      username,
      first_name: firstname,
      last_name: lastname,
      date_of_birth,
      location,
      profile_id: Number(profileId),
    };
    const isValid = editProfileInfosSchema.safeParse(userProfileData);
    if (!isValid.success) return;
    updateProfile(userProfileData);
  };

  return (
    <>
      <Container className="lg:mt-4 ">
        <TitleH2
          title="Evalute your skill"
          legend="To make the team generation algorithm more accurate and help 
          you find matches suited to your level, you can assess your skills 
          in each area."
        />
      </Container>
      <Container className="flex flex-grow flex-col items-center p-5 lg:mt-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-grow flex-col items-center
          py-4"
        >
          {ALL_SKILLS.map((skill) => (
            <FieldsetRadioInput
              key={idComp + skill}
              name={skill}
              options={LEVEL_SCALE}
            />
          ))}
          <button
            className="my-auto flex cursor-pointer rounded-lg bg-primary-400 
            px-4 py-2 font-medium text-dark text-opacity-70 
            shadow-sm duration-300 ease-in-out hover:bg-primary-700"
          >
            {t('event:sendEvaluation')}
          </button>
        </form>
        <div className="mx-auto flex w-2/3 max-w-xs gap-x-3">
          <button
            onClick={() => navigate(-1)}
            className="my-auto w-1/2 rounded-md 
            border border-primary-700 bg-base-light bg-opacity-75 py-2 
            text-center text-lg text-dark shadow-md"
          >
            Back
          </button>
          <button
            onClick={() => validateOnBoarding()}
            className={cn(
              `my-auto w-1/2 rounded-md bg-primary-700
            py-2 text-center text-lg text-white shadow-md`,
              !(username && username.length > 2) &&
                'pointer-events-none cursor-not-allowed opacity-50',
            )}
          >
            Next
          </button>
        </div>
      </Container>
    </>
  );
}

export default OnBoardingEvaluateSkill;
