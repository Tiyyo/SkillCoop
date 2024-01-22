import { useState } from 'react';
import TriggerEditBtn from './trigger-edit-btn';
import AvatarEdit from './edit-avatar';
import FormEditProfileInfos from './form-edit-profile';
import ResumeEmailInfos from './resume-email';
import EditModalPassword from './modal-edit-password';
import { Edit2, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../stores/app.store';

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
  const { t } = useTranslation('system');
  const [isEditing, setIsEditing] = useState(false);
  const { userProfile } = useApp();

  const getEditState = (state: boolean) => {
    setIsEditing(!state);
  };
  return (
    <div
      className="flex h-fit w-full flex-col bg-base-light shadow 
    lg:my-4 lg:rounded-xl "
    >
      <div
        className="-top-12 flex 
             flex-col bg-base pl-6"
      >
        <div className="relative flex items-center gap-x-5 py-4 ">
          <AvatarEdit
            avatar={infos.avatar}
            profileId={userProfile?.profile_id}
          />
          <TriggerEditBtn
            className="absolute right-3 top-3"
            getCurrentState={getEditState}
          />
        </div>
      </div>
      <div className="relative w-full self-end py-4 text-end">
        <FormEditProfileInfos shouldEditInfos={isEditing} infos={infos} />
        <div className="flex flex-col items-center justify-start xl:flex-row">
          <ResumeEmailInfos email={infos.email} />
          <div className="relative flex w-full flex-col pl-8 lg:pl-36 xl:w-1/2">
            <div className="flex justify-between pr-3">
              <div className="flex w-full max-w-xs items-center gap-x-2.5 py-4">
                <div className="basis-7 text-primary-100">
                  <Lock size={18} />
                </div>
                <div className="flex flex-grow flex-col gap-y-1">
                  <label
                    htmlFor="email"
                    className="ml-2 block h-4 text-start text-xs font-medium
                     text-grey-sub-text"
                  >
                    {t('password')}
                  </label>
                  <input
                    type="password"
                    defaultValue={'nicetrynotyours'}
                    readOnly
                    disabled
                    className="border-secondary-400 peer block 
                    w-full bg-transparent px-2.5 pb-1.5 pt-3 text-sm"
                  />
                </div>
              </div>
              <EditModalPassword>
                <Edit2 className="text-light" size={18} />
              </EditModalPassword>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeProfile;
