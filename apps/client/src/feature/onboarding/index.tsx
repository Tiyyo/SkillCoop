import { Outlet } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import Page from '../../layout/page';
import Container from '../../layout/container';

function OnBoarding() {
  const { logout } = useLogout();
  return (
    <Page>
      <Container className="lg:mt-4 flex justify-between px-4 py-4">
        <p className="font-semibold text-sm md:text-md lg:text-2xl text-dark">
          Skill<span className="text-primary-100">coop</span>
        </p>
        <button onClick={logout} className="text-xs text-primary-700">
          Logout
        </button>
      </Container>
      <Outlet />
    </Page>
  );
}

export default OnBoarding;
