import { Outlet } from 'react-router-dom';
import useLogout from '../../shared/hooks/useLogout';
import Page from '../../shared/layouts/page';
import Container from '../../shared/layouts/container';
import { useTranslation } from 'react-i18next';
import WrapperMain from '../../shared/layouts/wrapper-main';

function OnBoarding() {
  const { t } = useTranslation('auth');
  const { logout } = useLogout();

  return (
    <Page>
      <WrapperMain>
        <Container
          className="flex flex-row justify-between
           px-4 py-4 lg:mt-4"
        >
          <p
            className="text-sm font-semibold text-light md:text-md 
            lg:text-2xl"
          >
            Skill<span className="text-primary-100">coop</span>
          </p>
          <button onClick={logout} className="text-xs text-primary-700">
            {t('logout')}
          </button>
        </Container>
        <Outlet />
      </WrapperMain>
    </Page>
  );
}

export default OnBoarding;
