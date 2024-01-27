import { Link, useNavigate, useParams } from 'react-router-dom';
import TitleH2 from '../../components/title-h2';
import Container from '../../layouts/container';
import { cn } from '../../lib/utils';
import AvatarEdit from '../profile/edit-avatar';
import { useOnboarding } from '../../stores/onboarding.store';

function OnBoardinAddImageProfile() {
  const { profileId } = useParams();
  const { setInputValue, avatar } = useOnboarding();
  const id = Number(profileId);
  const navigate = useNavigate();

  const getAvatarLink = (value: string) => {
    const inputName = 'avatar';
    setInputValue(inputName, value);
  };

  return (
    <>
      <Container className="lg:mt-4 ">
        <TitleH2
          title="Add a profile picture"
          legend="Do you want to add a profile picture ? It's not mandatory"
        />
      </Container>
      <Container
        className="flex  flex-grow flex-col items-center justify-between gap-y-24 
        p-5 pt-16 lg:mt-4"
      >
        <div className="flex-grow">
          <AvatarEdit
            avatar={avatar}
            profileId={id}
            updateState={getAvatarLink}
          />
        </div>
        <div className="mx-auto flex w-2/3 max-w-xs gap-3">
          <button
            onClick={() => navigate(-1)}
            className="my-auto w-1/2 rounded-md 
            border border-primary-700 bg-base-light bg-opacity-75 py-2 text-center text-lg 
          text-dark shadow-md"
          >
            Back
          </button>
          <Link
            to={`/onboarding/${id}/evaluation`}
            className={cn(
              `my-auto w-1/2 rounded-md bg-primary-700
            py-2 text-center text-lg text-white shadow-md`,
            )}
          >
            Next
          </Link>
        </div>
      </Container>
    </>
  );
}

export default OnBoardinAddImageProfile;