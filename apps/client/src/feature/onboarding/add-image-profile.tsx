import { Link, useNavigate, useParams } from 'react-router-dom';
import TitleH2 from '../../component/title-h2';
import Container from '../../layout/container';
import { cn } from '../../lib/utils';
import AvatarEdit from '../profile/edit-avatar';
import { useOnboarding } from '../../store/onboarding.store';

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
        className="lg:mt-4  flex flex-col flex-grow gap-y-24 p-5 
        items-center justify-between pt-16"
      >
        <div className="flex-grow">
          <AvatarEdit
            avatar={avatar}
            profileId={id}
            updateState={getAvatarLink}
          />
        </div>
        <div className="mx-auto flex max-w-xs w-2/3 gap-3">
          <button
            onClick={() => navigate(-1)}
            className="bg-base-light bg-opacity-75 text-dark 
            text-lg py-2 my-auto rounded-md shadow-md w-1/2 border 
          border-primary-700 text-center"
          >
            Back
          </button>
          <Link
            to={`/onboarding/${id}/evaluation`}
            className={cn(
              `w-1/2 bg-primary-700 text-white text-lg
            rounded-md shadow-md text-center my-auto py-2`,
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
