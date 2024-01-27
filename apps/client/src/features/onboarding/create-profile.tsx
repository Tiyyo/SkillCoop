import { Link, useParams } from 'react-router-dom';
import Input from '../../components/input';
import Container from '../../layouts/container';
import TitleH2 from '../../components/title-h2';
import { Calendar, MapPin, User2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useOnboarding } from '../../stores/onboarding.store';
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
        className="flex flex-grow flex-col items-center justify-between 
        gap-y-24 p-5 lg:mt-4"
      >
        <form
          className="w-full max-w-7xl gap-2 
          sm:grid sm:grid-cols-2"
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
        <div className="mx-auto flex w-2/3 max-w-xs gap-3">
          <Link
            to=""
            className="my-auto w-1/2 rounded-md 
            border border-primary-700 bg-base-light bg-opacity-75 py-2 text-center text-lg 
          text-dark opacity-0 shadow-md"
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
              `my-auto w-1/2 rounded-md bg-primary-700
            py-2 text-center text-lg text-white shadow-md`,
              !(username && username.length > 2) &&
                'pointer-events-none cursor-not-allowed opacity-50',
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