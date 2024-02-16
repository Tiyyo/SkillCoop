import { Calendar, MapPin, User2 } from 'lucide-react';
import FormField from '../../shared/components/form-field';
import capitalize from '../../shared/utils/capitalize';
import { UseFormRegister } from 'react-hook-form';
import { Infos } from './resume-profile';
import Button from '../../shared/components/button';
import { useTranslation } from 'react-i18next';
import useUpdateProfileInfos from './hooks/useUpdateProfileInfos';

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
    <div className="flex w-full max-w-xs items-center gap-x-2.5 px-4 py-4">
      <div className="basis-7 text-primary-100">{Icon}</div>
      <div className="flex flex-grow flex-col gap-y-1">
        <label
          htmlFor={name}
          className=" ml-2 block h-4 text-start text-xs font-medium 
          text-grey-sub-text"
        >
          {label}
        </label>
        {!shouldEditInfos ? (
          <p
            className="my-auto ml-1 flex 
          h-12 items-center
              bg-base-light p-1 font-semibold text-primary-1100"
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
  const {
    onSubmit,
    handleSubmit,
    register,
    getAgeString,
    getBirthDate,
    isLoading,
    profileInfos,
  } = useUpdateProfileInfos({ infos });

  return (
    <form
      className="flex flex-col justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input hidden value={infos.profileId} {...register('profile_id')} />
      <div
        className="flex flex-col pl-4 sm:grid sm:grid-cols-2 
        lg:flex lg:flex-row"
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
          name="firstname"
          value={profileInfos.firstname}
          shouldEditInfos={shouldEditInfos}
          Icon={<User2 size={18} />}
          register={register}
        />
        <Field
          label={t('lastName')}
          type="text"
          name="lastname"
          value={profileInfos.lastname}
          shouldEditInfos={shouldEditInfos}
          Icon={<User2 size={18} />}
          register={register}
        />
        <Field
          label={t('age')}
          type="date"
          name="age"
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
