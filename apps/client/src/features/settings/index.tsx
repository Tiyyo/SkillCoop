import { Outlet } from 'react-router-dom';
import TitleH1 from '../../components/title-h1';
import Container from '../../shared/layouts/container';
import { useGetUserPreferences } from '../../hooks/useUserPreference';
import { useApp } from '../../shared/store/app.store';
import { useTranslation } from 'react-i18next';

function Settings() {
  const { t } = useTranslation('title');
  const { userId } = useApp();
  const { data: userPreference } = useGetUserPreferences({
    userId,
  });

  return (
    <>
      <Container className="lg:mt-4">
        <TitleH1 title={t('settings')} legend={t('settingsLegend')} />
      </Container>
      <Outlet context={userPreference} />
    </>
  );
}

export default Settings;
