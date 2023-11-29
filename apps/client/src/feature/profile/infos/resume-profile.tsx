import { useState } from 'react';
import TriggerEditBtn from './trigger-edit-btn';
import AvatarEdit from './edit-avatar';
import FormEditProfileInfos from './form-edit-profile';
import ResumeEmailInfos from './resume-auth-infos';
import EditModalPassword from './modal-edit-password';

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

  const getEditState = (state: boolean) => {
    setIsEditing(!state);
  };
  return (
    <div
      className="flex flex-col rounded-xl w-full lg:my-4 overflow-hidden bg-base-light 
    shadow h-fit"
    >
      <div className="relative bg-primary-20 -z-0 h-24 w-full"></div>
      <div
        className="relative  flex flex-col 
             pl-6 -top-12 z-10"
      >
        <div className="flex items-center gap-x-5">
          <AvatarEdit avatar={infos.avatar} />
          <TriggerEditBtn
            className="absolute top-3 right-3"
            getCurrentState={getEditState}
          />
        </div>
      </div>
      <div className="relative -top-24 text-end w-full self-end py-4">
        <FormEditProfileInfos shouldEditInfos={isEditing} infos={infos} />
        <div className="flex xl:flex-row flex-col items-center justify-start">
          <ResumeEmailInfos email={infos.email} />
          <span className="flex justify-start xl:w-1/2 relative ">
            <EditModalPassword />
          </span>
        </div>
      </div>
    </div>
  );
}

export default ResumeProfile;
