import { useState } from 'react';
import Container from '../../../layout/container';
import TriggerEditBtn from './trigger-edit-btn';
import AvatarEdit from './edit-avatar';
import FormEditProfileInfos from './form-edit-profile';

export type Infos = {
  username: string | null;
  avatar: string | null;
  firstname: string | null;
  lastname: string | null;
  age: string | null;
  location: string | null;
  profileId?: number;
};

function ResumeProfile({ infos }: { infos: Infos }) {
  const [isEditing, setIsEditing] = useState(false);

  const getEditState = (state: boolean) => {
    setIsEditing(!state);
  };
  return (
    <Container className="relative">
      <TriggerEditBtn
        className="absolute top-3 right-3"
        getCurrentState={getEditState}
      />
      <div className="flex items-start gap-4 py-8">
        <AvatarEdit avatar={infos.avatar} />
        <FormEditProfileInfos shouldEditInfos={isEditing} infos={infos} />
      </div>
    </Container>
  );
}

export default ResumeProfile;
