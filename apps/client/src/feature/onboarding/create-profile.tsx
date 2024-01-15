import { Link, useParams } from 'react-router-dom';
import Input from '../../component/input';
import Container from '../../layout/container';
import TitleH2 from '../../component/title-h2';
import { Calendar, MapPin, User2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useOnboarding } from '../../store/onboarding.store';
import { queryClient } from '../../main';
import { userCreateProfile } from '../../hooks/useProfile';

function OnBoardingCreateProfile() {
  const { profileId } = useParams();
  const {
    setInputValue,
    username,
    firstname,
    lastname,
    date_of_birth,
    location,
  } = useOnboarding();
  const { mutate: createProfile } = userCreateProfile({});

  const getValueInput = (value: string, inputName: string) => {
    setInputValue(inputName, value);
  };

  const updateQueryData = () => {
    // create a profile with username
    if (!username || !profileId) return;
    createProfile({ profile_id: Number(profileId), username });

    queryClient.setQueryData(['auth-user'], (oldData: any) => {
      if (oldData) {
        return {
          ...oldData,
          userProfile: {
            ...oldData.userProfiles,
            username: username,
          },
        };
      } else {
        return oldData;
      }
    });
  };

  return (
    <>
      <Container className="lg:mt-4">
        <TitleH2
          title="Create your profile"
          legend="This is your first connection, and we need some 
        additional information.Let's get started by creating your profile."
        />
      </Container>
      <Container
        className="lg:mt-4 flex flex-col flex-grow gap-y-24 
        p-5 items-center justify-between"
      >
        <form
          className="w-full sm:grid sm:grid-cols-2 
          gap-2 max-w-7xl"
        >
          <Input
            label="Username"
            updateState={(e) => getValueInput(e, 'username')}
            value={username ?? ''}
          >
            <User2 size={18} />
          </Input>
          <Input
            label="First Name"
            updateState={(e) => getValueInput(e, 'firstname')}
            value={firstname ?? ''}
          >
            <User2 size={18} />
          </Input>
          <Input
            label="Last Name"
            updateState={(e) => getValueInput(e, 'lastname')}
            value={lastname ?? ''}
          >
            <User2 size={18} />
          </Input>
          <Input
            label="Date of birth"
            type="date"
            updateState={(e) => getValueInput(e, 'date_of_birth')}
            value={date_of_birth ?? ''}
          >
            <Calendar size={18} />
          </Input>
          <Input
            label="Location"
            updateState={(e) => getValueInput(e, 'location')}
            value={location ?? ''}
          >
            <MapPin size={18} />
          </Input>
        </form>
        <div className="mx-auto flex max-w-xs w-2/3 gap-3">
          <Link
            to=""
            className="bg-base-light bg-opacity-75 text-dark 
            text-lg py-2 my-auto rounded-md shadow-md w-1/2 border 
          border-primary-700 text-center opacity-0"
          >
            Back
          </Link>
          <Link
            to="add-image"
            // update the query to force isfirstconnection to false
            // create a profile with minimum information( username)
            // to be able to update avatar in second phase
            onClick={updateQueryData}
            className={cn(
              `w-1/2 bg-primary-700 text-white text-lg
            rounded-md shadow-md text-center my-auto py-2`,
              !(username && username.length > 2) &&
                'opacity-50 cursor-not-allowed pointer-events-none',
            )}
          >
            Next
          </Link>
        </div>
      </Container>
    </>
  );
}

export default OnBoardingCreateProfile;
