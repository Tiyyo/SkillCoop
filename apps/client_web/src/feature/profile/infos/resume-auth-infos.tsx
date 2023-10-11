import { useState } from 'react';
import Container from '../../../layout/container';
import TriggerEditBtn from './trigger-edit-btn';
import { useForm } from 'react-hook-form';
import FormField from '../../../component/form-field';
import EditModalPassword from './modal-edit-password';
import { SendIcon } from 'lucide-react';
import schema from 'schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { updateEmailFn } from '../../../api/api.fn';
import { useApp } from '../../../store/app.store';
const { emailSchema } = schema;

function ResumeAuthInfos({ email }) {
  const { userProfile } = useApp();
  const [currentEmail, setCurrentEmail] = useState(email);
  const [errorText, setErrorText] = useState('');
  const [editActiveState, setEditActiveState] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(emailSchema) });
  const { mutate, error, isError } = useMutation((data) => updateEmailFn(data));

  const getEditState = (state: boolean) => {
    setEditActiveState(!state);
  };

  const onSubmit = async (data: any) => {
    data.user_id = userProfile?.user_id;
    mutate(data);
    if (error) {
      setErrorText('Email already used');
      return;
    }
    setCurrentEmail(data.email);
  };

  return (
    <Container className="relative pt-10">
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
          defaultValue={currentEmail}
          error={errorText}
          disabled={!editActiveState}
          register={register}>
          <SendIcon size={18} />
        </FormField>
        {editActiveState && (
          <button
            type="submit"
            className="text-primary-700 my-1 py-2.5 px-8 w-fit self-center cursor-pointer hover:bg-base duration-200 transition-all rounded-lg">
            Edit informations
          </button>
        )}
      </form>
      <EditModalPassword />
    </Container>
  );
}

export default ResumeAuthInfos;
