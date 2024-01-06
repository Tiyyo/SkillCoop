import { Outlet } from 'react-router-dom';
import TitleH1 from '../../component/title-h1';
import Container from '../../layout/container';
import { useGetUserPreferences } from '../../hooks/useUserPreference';
import { useApp } from '../../store/app.store';
import { useTranslation } from 'react-i18next';

function Settings() {
  const { t } = useTranslation('title');
  const { userProfile } = useApp();
  const { data: userPreference } = useGetUserPreferences({
    userId: userProfile?.user_id,
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
