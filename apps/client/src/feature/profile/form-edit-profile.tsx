import { Calendar, MapPin, User2 } from 'lucide-react';
import FormField from '../../component/form-field';
import capitalize from '../../utils/capitalize';
import { UseFormRegister, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Infos } from './resume-profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { editProfileInfosSchema } from 'schema/ts-schema';
import Button from '../../component/button';
import { useUpdateProfile } from '../../hooks/useProfile';
import toast from '../../utils/toast';
<<<<<<< HEAD
import { getAge } from '@skillcoop/date-handler/src';
=======
import { getAge } from 'date-handler/src';
import { useTranslation } from 'react-i18next';
>>>>>>> aa5cf6df31348fffebf5a3aa2a2bdf2e309550e8

type FormEditProfileInfosProps = {
  shouldEditInfos: boolean;
  infos: Infos;
};

type FieldProps = {
  shouldEditInfos: boolean;
  label: string;
  type: string;
  name: string;
  value?: string | null;
  valueForm?: string | null;
  Icon?: JSX.Element;
  register: UseFormRegister<any>;
};

function Field({
  shouldEditInfos,
  type,
  name,
  label,
  value,
  Icon,
  valueForm = value,
  register,
}: FieldProps) {
  return (
    <div className="w-full flex gap-x-2.5 items-center py-4 max-w-xs px-4">
      <div className="basis-7 text-primary-100">{Icon}</div>
      <div className="flex flex-col gap-y-1 flex-grow">
        <label
          htmlFor={name}
          className=" text-start block h-4 ml-2 text-xs font-medium 
          text-grey-sub-text"
        >
          {label}
        </label>
        {!shouldEditInfos ? (
          <p
            className="flex items-center bg-base-light 
          font-semibold text-primary-1100
              h-12 my-auto ml-1 p-1"
          >
            {capitalize(value)}
          </p>
        ) : (
          <FormField
            type={type}
            name={name}
            register={register}
            defaultValue={valueForm ?? undefined}
          ></FormField>
        )}
      </div>
    </div>
  );
}

function FormEditProfileInfos({
  shouldEditInfos,
  infos,
}: FormEditProfileInfosProps) {
  const { t } = useTranslation('system');
  const [profileInfos, setProfileInfos] = useState(infos);
  const { register, handleSubmit } = useForm({
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
    return getAge(date);
  };

  //@ts-ignore
  const onSubmit = (data) => {
    data.profile_id = infos.profileId;
    updateProfileInfos(data);
    setProfileInfos({
      ...profileInfos,
      username: data.username,
      firstname: data.first_name,
      lastname: data.last_name,
      age: data.date_of_birth === '' ? null : data.date_of_birth,
      location: data.location === '' ? null : data.location,
    });
  };

  return (
    <form
      className="flex flex-col justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input hidden value={infos.profileId} {...register('profile_id')} />
      <div
        className="flex flex-col sm:grid sm:grid-cols-2 xl:flex 
        xl:flex-row pl-4"
      >
        <Field
          label={t('username')}
          type="text"
          name="username"
          value={profileInfos.username}
          shouldEditInfos={shouldEditInfos}
          Icon={<User2 size={18} />}
          register={register}
        />
        <Field
          label={t('firstName')}
          type="text"
          name="first_name"
          value={profileInfos.firstname}
          shouldEditInfos={shouldEditInfos}
          Icon={<User2 size={18} />}
          register={register}
        />
        <Field
          label={t('lastName')}
          type="text"
          name="last_name"
          value={profileInfos.lastname}
          shouldEditInfos={shouldEditInfos}
          Icon={<User2 size={18} />}
          register={register}
        />
        <Field
          label={t('age')}
          type="date"
          name="date_of_birth"
          value={getAgeString(profileInfos.age)}
          valueForm={getBirthDate(profileInfos.age)}
          Icon={<Calendar size={18} />}
          shouldEditInfos={shouldEditInfos}
          register={register}
        />
        <Field
          label={t('location')}
          type="text"
          name="location"
          value={profileInfos.location}
          shouldEditInfos={shouldEditInfos}
          Icon={<MapPin size={18} />}
          register={register}
        />
      </div>
      {shouldEditInfos && (
        <Button
          type="submit"
          textContent={t('editInformations')}
          className="rounded-lg"
          variant="light"
          isLoading={isLoading}
        />
      )}
    </form>
  );
}

export default FormEditProfileInfos;
