import { useState } from 'react';
import TriggerEditBtn from './trigger-edit-btn';
import { useForm } from 'react-hook-form';
import FormField from '../../../component/form-field';
import { SendIcon } from 'lucide-react';
import { emailSchema } from 'schema/ts-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApp } from '../../../store/app.store';
import ErrorNotification from '../../../component/error/notification';
import Button from '../../../component/button';
import { useUpdateEmail } from '../../../hooks/useProfile';
import { UpdateEmail } from '../../../types';
import { updateEmailSchema } from 'schema/ts-schema';
import toast from '../../../utils/toast';

function ResumeEmailInfos({ email }: { email?: string | null }) {
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
      toast.success('Email updated');
    },
    onError: () => {
      setErrorText('Email already used');
    },
  });
  const getEditState = (state: boolean) => {
    setEditActiveState(!state);
  };

  const onSubmit = async (data: UpdateEmail) => {
    data.user_id = userProfile?.user_id!; // TODO: fix this
    const isValid = updateEmailSchema.safeParse(data);
    if (!isValid.success) {
      setErrorText('Something went wrong. Please try again later');
      return;
    }
    updateEmail(data);
  };

  return (
    <>
      <ErrorNotification message={errorText} interval={5000} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col pl-36 w-full xl:w-1/2"
      >
        <div className="flex justify-between pr-3">
          <div className="w-full flex gap-x-2.5 items-center py-4 max-w-xs">
            <div className="basis-7 text-primary-100">
              <SendIcon size={18} />
            </div>
            <div className="flex flex-col gap-y-1 flex-grow">
              <label
                htmlFor="email"
                className="block h-4 ml-2 text-xs text-start font-medium text-grey-sub-text"
              >
                Email
              </label>
              <FormField
                type="email"
                name="email"
                defaultValue={currentEmail ?? ''}
                disabled={!editActiveState}
                register={register}
              />
            </div>
          </div>
          <input
            type="hidden"
            value={userProfile?.user_id}
            {...register('user_id')}
          />
          <TriggerEditBtn
            getCurrentState={getEditState}
            className="self-start py-3"
          />
        </div>
        {editActiveState && (
          <Button
            type="submit"
            isLoading={isLoading}
            variant="light"
            textContent="Edit Email"
          />
        )}
      </form>
    </>
  );
}

export default ResumeEmailInfos;
