import { useRef, useState } from 'react';
import { useApp } from '../../store/app.store';
import toast from '../../utils/toast';
import { useUpdateAvatar } from '../../hooks/useProfile';
import { useTranslation } from 'react-i18next';

function AvatarEdit({ avatar }: { avatar: string | null }) {
  const { t } = useTranslation('system');
  const { userProfile } = useApp();
  const [profileAvatar, setProfileAvatar] = useState<string | null>(avatar);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const MAX_SIZE_IMAGE = 5242880; // 5 mo
  const VALID_FILES_TYPES = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/svg',
    'image/webp',
  ];

  // emulate click on input when user click on image
  const handleClickImage = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (!imageInputRef.current) return;
    imageInputRef.current.click();
  };

  const { mutate: uploadImage } = useUpdateAvatar({
    profileId: userProfile?.profile_id,
    onSuccess: (response: any) => {
      setProfileAvatar(response.link);
    },
    onError: () => {
      toast.error('Error while updating avatar');
    },
  });

  const handleChangeImageFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!userProfile?.profile_id || !e.target.files) return;
    if (
      !VALID_FILES_TYPES.find((type) => {
        if (!e.target.files) return;
        return type === e.target.files[0].type;
      })
    ) {
      toast.error(t('fileMustBe'));
      return;
    } else if (e.target.files[0].size > MAX_SIZE_IMAGE) {
      toast.error(t('fileMustNoTExceed') + ' 5 mo');
      return;
    } else {
      const formData = new FormData();
      formData.append('profile_id', userProfile?.profile_id.toString());
      formData.append('avatar', e.target.files[0]);
      uploadImage(formData);
    }
  };

  return (
    <form
      encType="multipart/form-data"
      className="flex-shrink-0 overflow-hidden 
        h-24 w-24  border-primary-200 border-4 shadow rounded-lg cursor-pointer"
    >
      <label htmlFor="image" onClick={handleClickImage}>
        <img
          src={profileAvatar ?? '/images/default-avatar.png'}
          alt="avatar"
          className="object-cover h-full w-full"
        />
      </label>
      <p>{t('editAvatar')}</p>
      <input
        type="file"
        hidden
        ref={imageInputRef}
        id="image"
        name="image"
        className="h-20 w-20"
        onChange={handleChangeImageFile}
      />
    </form>
  );
}

export default AvatarEdit;
