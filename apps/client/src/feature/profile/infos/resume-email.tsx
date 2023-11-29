import { useState } from 'react';
import Container from '../../../layout/container';
import TriggerEditBtn from './trigger-edit-btn';
import { useForm } from 'react-hook-form';
import FormField from '../../../component/form-field';
import EditModalPassword from './modal-edit-password';
import { SendIcon } from 'lucide-react';
import { emailSchema } from 'schema/ts-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApp } from '../../../store/app.store';
import ErrorNotification from '../../../component/error/notification';
import Button from '../../../component/button';
import { useUpdateEmail } from '../../../hooks/useProfile';
import { UpdateEmail } from '../../../types';

function ResumeAuthInfos({ email }: { email?: string | null }) {
  const { userProfile } = useApp();
  const [currentEmail, setCurrentEmail] = useState(email);
  const [errorText, setErrorText] = useState('');
  const [editActiveState, setEditActiveState] = useState(false);
  const { register, handleSubmit } = useForm<UpdateEmail>({
    resolver: zodResolver(emailSchema),
  });
  const { mutate: updateEmail, isLoading } = useUpdateEmail({
    onSuccess: (res: any) => {
      setCurrentEmail(res.new_email);
    },
    onError: () => {
      setErrorText('Email already used');
    },
  });
  const getEditState = (state: boolean) => {
    setEditActiveState(!state);
  };

  const onSubmit = async (data: UpdateEmail) => {
    if (!data.email) return;
    updateEmail(data);
  };

  return (
    <>
      <ErrorNotification message={errorText} interval={5000} />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <input
          type="hidden"
          value={userProfile?.user_id}
          {...register('user_id')}
        />
        <TriggerEditBtn
          getCurrentState={getEditState}
          className="absolute top-3 right-3"
        />
        <FormField
          type="email"
          label="Email"
          name="email"
          defaultValue={currentEmail ?? ''}
          disabled={!editActiveState}
          register={register}
        >
          <SendIcon size={18} />
        </FormField>
        {editActiveState && (
          <Button
            type="submit"
            isLoading={isLoading}
            variant="light"
            textContent="Edit Email"
          />
        )}
      </form>
      <EditModalPassword />
    </>
  );
}

export default ResumeAuthInfos;
