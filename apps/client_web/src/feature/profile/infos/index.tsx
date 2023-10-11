import { useApp } from '../../../store/app.store';
import DeleteUser from './delete-user';
import ResumeProfile from './resume-profile';
import ResumeAuthInfos from './resume-auth-infos';

function ProfileInfos() {
  const { userProfile } = useApp();

  return (
    <>
      <ResumeProfile
        infos={{
          profileId: userProfile?.profile_id,
          username: userProfile?.username ?? null,
          avatar: userProfile?.avatar_url ?? null,
          firstname: userProfile?.first_name ?? null,
          lastname: userProfile?.last_name ?? null,
          age: userProfile?.date_of_birth ?? null,
          location: userProfile?.location ?? null,
        }}
      />
      <ResumeAuthInfos email={userProfile?.email} />
      <DeleteUser />
    </>
  );
}

export default ProfileInfos;
