import { useApp } from '../../../store/app.store';
import DeleteUser from './delete-user';
import ResumeProfile from './resume-profile';
import SubHeader from '../../../component/header/sub-header';

function ProfileInfos() {
  const { userProfile } = useApp();

  return (
    <>
      <SubHeader
        title="Profile"
        isPlusExist={false}
        legend="You can update all 
        your profile informations here"
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
      <DeleteUser />
    </>
  );
}

export default ProfileInfos;
