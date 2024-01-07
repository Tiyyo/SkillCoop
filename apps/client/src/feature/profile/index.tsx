import { useApp } from '../../store/app.store';
import ResumeProfile from './resume-profile';
import SubHeader from '../../component/header/sub-header';
import { useTranslation } from 'react-i18next';

function ProfileInfos() {
  const { t } = useTranslation('title');
  const { userProfile } = useApp();

  return (
    <>
      <SubHeader
        title={t('profile')}
        isPlusExist={false}
        legend={t('profileLegend')}
      />
      <ResumeProfile
        infos={{
          profileId: userProfile?.profile_id,
          username: userProfile?.username ?? null,
          avatar: userProfile?.avatar_url ?? null,
          firstname: userProfile?.first_name ?? null,
          lastname: userProfile?.last_name ?? null,
          age: userProfile?.date_of_birth ?? null,
          location: userProfile?.location ?? null,
          email: userProfile?.email ?? null,
        }}
      />
    </>
  );
}

export default ProfileInfos;
