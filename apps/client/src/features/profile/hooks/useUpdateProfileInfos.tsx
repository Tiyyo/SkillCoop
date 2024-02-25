import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  editProfileInfosSchema,
  EditProfileInfos,
} from '@skillcoop/schema/src';
import { useUpdateProfile } from '../../../shared/hooks/useProfile';
import toast from '../../../shared/utils/toast';
import { getAge, getUTCString } from '@skillcoop/date-handler/src';
import { useTranslation } from 'react-i18next';
import { Infos } from '../resume-profile';

type UpdateProfile = {
  profile_id: string;
  username: string;
  firstname: string | null;
  lastname: string | null;
  age: string | null;
  location: string | null;
};

export default function useUpdateProfileInfos({ infos }: { infos: Infos }) {
  const { t } = useTranslation('system');
  const [profileInfos, setProfileInfos] = useState(infos);
  const { register, handleSubmit } = useForm<UpdateProfile>({
    resolver: zodResolver(editProfileInfosSchema),
  });
  const { mutate: updateProfileInfos, isLoading } = useUpdateProfile({
    profileId: infos.profileId,
    onSuccess: () => {
      toast.success(t('profileInformationsUpdated'));
    },
  });

  const getBirthDate = (date: string | null) => {
    if (!date) return '';
    return date.split(' ')[0];
  };

  const getAgeString = (date: string | null) => {
    if (!date) return '';
    return getAge(date) + ' ' + t('yo');
  };

  const onSubmit = (data: EditProfileInfos) => {
    const updateProfileInfosData = {
      profile_id: infos.profileId,
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      date_of_birth: data.date_of_birth
        ? getUTCString(new Date(data.date_of_birth))
        : null,
      location: data.location,
    };

    updateProfileInfos(updateProfileInfosData);
    setProfileInfos({
      ...profileInfos,
      username: data.username ?? null,
      firstname: data.first_name ?? null,
      lastname: data.last_name ?? null,
      age: data.date_of_birth ?? null,
      location: data.location ?? null,
    });
  };
  return {
    onSubmit,
    handleSubmit,
    register,
    getAgeString,
    getBirthDate,
    isLoading,
    profileInfos,
  };
}
