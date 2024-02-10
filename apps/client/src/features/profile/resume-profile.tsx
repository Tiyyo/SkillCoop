import { useState } from 'react';
import FormEditProfileInfos from './form-edit-profile';
import ResumeEmailInfos from './resume-profile.email';
import { useApp } from '../../shared/store/app.store';
import ResumeProfileBanner from './resume-profile.banner';
import ResumeProfilePassword from './resume-profile.password';

export type Infos = {
  username: string | null;
  avatar: string | null;
  firstname: string | null;
  lastname: string | null;
  age: string | null;
  location: string | null;
  profileId?: number;
  email?: string | null;
};

function ResumeProfile({ infos }: { infos: Infos }) {
  const [isEditing, setIsEditing] = useState(false);
  const { userProfile } = useApp();

  const getEditState = (state: boolean) => {
    setIsEditing(!state);
  };
  return (
    <div
      className="flex h-fit w-full flex-col overflow-hidden bg-base-light 
    shadow lg:my-4 lg:rounded-xl"
    >
      <ResumeProfileBanner
        avatar={infos.avatar}
        profileId={userProfile?.profile_id}
        getCurrentState={getEditState}
      />
      <div className="relative w-full self-end py-4 text-end">
        <FormEditProfileInfos shouldEditInfos={isEditing} infos={infos} />
        <div
          className="flex flex-col items-center justify-start px-8 
          lg:flex-row"
        >
          <ResumeEmailInfos email={infos.email} />
          <div className="relative flex w-full flex-col lg:w-1/2">
            <ResumeProfilePassword />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeProfile;
