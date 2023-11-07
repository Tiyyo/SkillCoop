import { useEffect, useState } from 'react';
import Container from '../../../layout/container';
import TriggerEditBtn from './trigger-edit-btn';
import { useForm } from 'react-hook-form';
import FormField from '../../../component/form-field';
import EditModalPassword from './modal-edit-password';
import { SendIcon } from 'lucide-react';
import { emailSchema } from 'schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { updateEmailFn } from '../../../api/api.fn';
import { useApp } from '../../../store/app.store';
import ErrorNotification from '../../../component/error/notification';
import Button from '../../../component/button';

function ResumeAuthInfos({ email }: { email?: string | null }) {
  const { userProfile } = useApp();
  const [currentEmail, setCurrentEmail] = useState(email);
  const [errorText, setErrorText] = useState('');
  const [editActiveState, setEditActiveState] = useState(false);
  const { register, handleSubmit } = useForm({
    //@ts-ignore
    resolver: zodResolver(emailSchema),
  });
  const { mutate, error, isError, isLoading } = useMutation((data) =>
    //@ts-ignore
    updateEmailFn(data)
  );

  const getEditState = (state: boolean) => {
    setEditActiveState(!state);
  };

  const onSubmit = async (data: any) => {
    data.user_id = userProfile?.user_id;
    mutate(data);
    if (!isError) setCurrentEmail(data.email);
  };

  useEffect(() => {
    if (error) {
      setErrorText('Email already used');
    } else {
      setErrorText('');
    }
  }, [isLoading, error, isError]);

  return (
    <Container className="relative pt-10">
      <ErrorNotification message={errorText} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col">
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
          register={register}>
          <SendIcon size={18} />
        </FormField>
        {editActiveState && (
          <Button
            type="submit"
            isLoading={isLoading}
            variant="light"
            textContent="Edit informations"
          />
        )}
      </form>
      <EditModalPassword />
    </Container>
  );
}

export default ResumeAuthInfos;
