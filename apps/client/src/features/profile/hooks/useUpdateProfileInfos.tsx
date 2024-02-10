import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { editProfileInfosSchema } from '@skillcoop/schema/src';
import { useUpdateProfile } from '../../../shared/hooks/useProfile';
import toast from '../../../utils/toast';
import { getAge } from '@skillcoop/date-handler/src';
import { useTranslation } from 'react-i18next';
import { Infos } from '../resume-profile';

type UpdateProfile = {
  profile_id: number;
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

  const onSubmit = (data: UpdateProfile) => {
    const updateProfileInfosData = {
      profile_id: infos.profileId,
      username: data.username,
      first_name: data.firstname,
      last_name: data.lastname,
      date_of_birth: data.age,
      location: data.location,
    };
    updateProfileInfos(updateProfileInfosData);
    setProfileInfos({
      ...profileInfos,
      username: data.username,
      firstname: data.firstname,
      lastname: data.lastname,
      age: data.age === '' ? null : data.age,
      location: data.location === '' ? null : data.location,
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
