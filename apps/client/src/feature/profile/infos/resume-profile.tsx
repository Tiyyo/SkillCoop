import { useState } from 'react';
import TriggerEditBtn from './trigger-edit-btn';
import AvatarEdit from './edit-avatar';
import FormEditProfileInfos from './form-edit-profile';
import ResumeEmailInfos from './resume-auth-infos';
import EditModalPassword from './modal-edit-password';
import { Edit2, Lock } from 'lucide-react';

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
      className="flex flex-col lg:rounded-xl w-full lg:my-4  bg-base-light 
    shadow h-fit "
    >
      <div
        className=" flex flex-col 
             pl-6 -top-12 z-10"
      >
        <div className="relative py-4 flex items-center gap-x-5">
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
          <div className="relative flex flex-col pl-36 w-full xl:w-1/2">
            <div className="flex justify-between pr-3">
              <div className="w-full flex gap-x-2.5 items-center py-4 max-w-xs">
                <div className="basis-7 text-primary-100">
                  <Lock size={18} />
                </div>
                <div className="flex flex-col gap-y-1 flex-grow">
                  <label
                    htmlFor="email"
                    className="block h-4 ml-2 text-xs text-start font-medium text-grey-sub-text"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    defaultValue={'nicetrynoturs'}
                    readOnly
                    disabled
                    className="bg-transparent border-secondary-400 peer block w-full   
                    px-2.5 pb-1.5 pt-3 text-sm"
                  />
                </div>
              </div>
              <EditModalPassword>
                <button type="button" className="">
                  <Edit2 className="text-light" size={18} />
                </button>
              </EditModalPassword>
            </div>
          </div>
          {/* <span className="flex justify-start xl:w-1/2 relative pl-24 md:pl-0">
            <EditModalPassword />
          </span> */}
        </div>
      </div>
    </div>
  );
}

export default ResumeProfile;
