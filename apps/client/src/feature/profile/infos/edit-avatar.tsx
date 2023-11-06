import { useEffect, useRef, useState } from 'react';
import { updateAvatarFn } from '../../../api/api.fn';
import { useMutation } from '@tanstack/react-query';
import { useApp } from '../../../store/app.store';

function AvatarEdit({ avatar }: { avatar: string | null }) {
  const { userProfile } = useApp();
  const [profileAvatar, setProfileAvatar] = useState<string | null>(avatar);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleClickImage = (e: React.MouseEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (!imageInputRef.current) return;
    imageInputRef.current.click();
  };

  const { mutate, isSuccess, data, isLoading } = useMutation(
    (formData: FormData) => updateAvatarFn(formData)
  );

  const handleChangeImageFile = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!userProfile?.profile_id) return;
    const validFilesTypes = [
      'image/png',
      'image/jpg',
      'image/jpeg',
      'image/svg',
      'image/webp',
    ];
    const maxSize = 5242880; // 5 mo
    if (!e.target.files) return;
    if (
      !validFilesTypes.find((type) => {
        if (!e.target.files) return;
        return type === e.target.files[0].type;
      })
    ) {
      console.log('File must be an png or jpg type');
      return;
    } else if (e.target.files[0].size > maxSize) {
      console.log('File must not exceded 5 mo');
      return;
    } else {
      const formData = new FormData();
      formData.append('profile_id', userProfile?.profile_id.toString());
      formData.append('avatar', e.target.files[0]);
      mutate(formData);
    }
  };

  useEffect(() => {
    if (!isSuccess || !data || !data.link) return;
    setProfileAvatar(data.link);
  }, [isLoading]);

  return (
    <form
      encType="multipart/form-data"
      className="border flex-shrink-0 border-primary-500 overflow-hidden rounded-full h-20 w-20">
      <label
        htmlFor="image"
        onClick={handleClickImage}>
        <img
          src={profileAvatar ?? '/images/default-avatar.png'}
          alt="avatar"
          className="object-cover h-full w-full"
        />
      </label>
      <p>Edit avatar</p>
      <input
        type="file"
        hidden
        ref={imageInputRef}
        id="image"
        name="image"
        className="h-20 w-20 bg-violet-700"
        onChange={handleChangeImageFile}
      />
    </form>
  );
}

export default AvatarEdit;
