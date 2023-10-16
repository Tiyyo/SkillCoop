import { MapPin, User2 } from 'lucide-react';
import FormField from '../../../component/form-field';
import capitalize from '../../../utils/capitalize';
import { UseFormRegister, useForm } from 'react-hook-form';
import { useState } from 'react';
import { Infos } from './resume-profile';
import dateHandler from '../../../utils/date.handler';
import { zodResolver } from '@hookform/resolvers/zod';
import schema from 'schema';
import { useMutation } from '@tanstack/react-query';
import { updateProfileInfoFn } from '../../../api/api.fn';
import Button from '../../../component/button';
const { editProfileInfosSchema } = schema;

interface FormEditProfileInfosProps {
  shouldEditInfos: boolean;
  infos: Infos;
}

interface FieldProps {
  shouldEditInfos: boolean;
  label: string;
  type: string;
  name: string;
  value: string | null;
  valueForm?: string | null;
  Icon?: JSX.Element;
  register: UseFormRegister<any>;
}

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
    <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-4 p-2">
      <dt className=" text-primary-1100 font-semibold">{label}</dt>
      {!shouldEditInfos ? (
        <dd className="flex items-center text-light sm:col-span-2 border-t-primary-300 border-t h-12 my-auto ml-1 p-1">
          {capitalize(value)}
        </dd>
      ) : (
        <FormField
          type={type}
          name={name}
          register={register}
          defaultValue={valueForm ?? undefined}>
          {Icon}
        </FormField>
      )}
    </div>
  );
}

function FormEditProfileInfos({
  shouldEditInfos,
  infos,
}: FormEditProfileInfosProps) {
  const [profileInfos, setProfileInfos] = useState(infos);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editProfileInfosSchema),
  });
  const { mutate, isLoading } = useMutation((data) =>
    updateProfileInfoFn(data)
  );

  const getBirthDate = (date: string | null) => {
    if (!date) return '';
    return date.split(' ')[0];
  };

  const getAgeString = (date: string | null) => {
    if (!date) return '';
    return dateHandler.getAgeFromDate(date);
  };

  const onSubmit = (data) => {
    data.profile_id = infos.profileId;
    mutate(data);
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
      className="flex flex-col justify-between rounded-lg border border-gray-100 py-3 shadow-sm w-full"
      onSubmit={handleSubmit(onSubmit)}>
      <dl className="-my-3 divide-y divide-gray-100 text-sm ">
        <input
          hidden
          value={infos.profileId}
          {...register('profile_id')}
        />
        <Field
          label="Username"
          type="text"
          name="username"
          value={profileInfos.username}
          shouldEditInfos={shouldEditInfos}
          Icon={<User2 size={18} />}
          register={register}
        />
        <Field
          label="First Name"
          type="text"
          name="first_name"
          value={profileInfos.firstname}
          shouldEditInfos={shouldEditInfos}
          Icon={<User2 size={18} />}
          register={register}
        />
        <Field
          label="Last Name"
          type="text"
          name="last_name"
          value={profileInfos.lastname}
          shouldEditInfos={shouldEditInfos}
          Icon={<User2 size={18} />}
          register={register}
        />
        <Field
          label="Age"
          type="date"
          name="date_of_birth"
          value={getAgeString(profileInfos.age)}
          valueForm={getBirthDate(profileInfos.age)}
          shouldEditInfos={shouldEditInfos}
          register={register}
        />
        <Field
          label="Location"
          type="text"
          name="location"
          value={profileInfos.location}
          shouldEditInfos={shouldEditInfos}
          Icon={<MapPin size={18} />}
          register={register}
        />
      </dl>
      {shouldEditInfos && (
        <Button
          type="submit"
          textContent="Edit informations"
          variant="light"
          isLoading={isLoading}
        />
      )}
    </form>
  );
}

export default FormEditProfileInfos;
