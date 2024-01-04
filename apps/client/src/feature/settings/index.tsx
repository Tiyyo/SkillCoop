import { Outlet } from 'react-router-dom';
import TitleH1 from '../../component/title-h1';
import Container from '../../layout/container';
import { useGetUserPreferences } from '../../hooks/useUserPreference';
import { useApp } from '../../store/app.store';

function Settings() {
  const { userProfile } = useApp();
  const { data: userPreference } = useGetUserPreferences({
    userId: userProfile?.user_id,
  });

  console.log(userPreference);

  return (
    <>
      <Container className="lg:mt-4">
        <TitleH1
          title="Settings"
          legend="Customize your account, manage privacy, 
          and set up notifications. "
        />
      </Container>
      <Outlet context={userPreference} />
    </>
  );
}

export default Settings;
