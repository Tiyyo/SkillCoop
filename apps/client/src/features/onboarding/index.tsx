import { Outlet } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import Page from '../../layouts/page';
import Container from '../../layouts/container';

function OnBoarding() {
  const { logout } = useLogout();
  return (
    <Page>
      <Container className="flex justify-between px-4 py-4 lg:mt-4">
        <p className="text-sm font-semibold text-dark md:text-md lg:text-2xl">
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
