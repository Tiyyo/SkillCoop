import { useNavigate, useParams } from 'react-router-dom';
import TitleH2 from '../../component/title-h2';
import Container from '../../layout/container';
import { cn } from '../../lib/utils';
import FieldsetRadioInput from '../skills/fieldset-radio.input';
import { ALL_SKILLS } from '../../constant/skill-constant';
import { LEVEL_SCALE } from '../../constant/skill-constant';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserProfileEval } from '../../hooks/useUserProfileEval';
import { ownSkillSchema, editProfileInfosSchema } from '@skillcoop/schema/src';
import { useOnboarding } from '../../store/onboarding.store';
import { useUpdateProfile } from '../../hooks/useProfile';
import toast from '../../utils/toast';
import { useApp } from '../../store/app.store';

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
      toast.error('You cant evaluate your skill twice');
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
      <Container className="lg:mt-4 flex flex-col flex-grow p-5 items-center">
        <form
          onSubmit={handleSubmit}
          className="flex-grow flex flex-col py-4
          items-center"
        >
          {ALL_SKILLS.map((skill) => (
            <FieldsetRadioInput
              key={idComp + skill}
              name={skill}
              options={LEVEL_SCALE}
            />
          ))}
          <button
            className="flex my-auto py-2 px-4 rounded-lg shadow-sm 
            cursor-pointer hover:bg-primary-700 bg-primary-400 text-dark 
            font-medium text-opacity-70 duration-300 ease-in-out"
          >
            {t('event:sendEvaluation')}
          </button>
        </form>
        <div className="mx-auto flex max-w-xs w-2/3 gap-x-3">
          <button
            onClick={() => navigate(-1)}
            className="bg-base-light bg-opacity-75 text-dark 
            text-lg py-2 my-auto rounded-md shadow-md w-1/2 border 
          border-primary-700 text-center"
          >
            Back
          </button>
          <button
            onClick={() => validateOnBoarding()}
            className={cn(
              `w-1/2 bg-primary-700 text-white text-lg
            rounded-md shadow-md text-center my-auto py-2`,
              !(username && username.length > 2) &&
                'opacity-50 cursor-not-allowed pointer-events-none',
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
