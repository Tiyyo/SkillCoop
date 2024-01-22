import { useState } from 'react';
import TriggerEditBtn from './trigger-edit-btn';
import { useForm } from 'react-hook-form';
import FormField from '../../components/form-field';
import { SendIcon } from 'lucide-react';
import { emailSchema } from '@skillcoop/schema/src';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApp } from '../../stores/app.store';
import ErrorNotification from '../../components/error/notification';
import Button from '../../components/button';
import { useUpdateEmail } from '../../hooks/useProfile';
import type { UpdateEmail } from '@skillcoop/types/src';
import { updateEmailSchema } from '@skillcoop/schema/src';
import toast from '../../utils/toast';
import { useTranslation } from 'react-i18next';

function ResumeEmailInfos({ email }: { email?: string | null }) {
  const { t } = useTranslation('system');
  const { userProfile, userId } = useApp();
  const [currentEmail, setCurrentEmail] = useState(email);
  const [errorText, setErrorText] = useState('');
  const [editActiveState, setEditActiveState] = useState(false);
  const [countRender, setCountRender] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateEmail>({
    resolver: zodResolver(emailSchema),
  });
  const { mutate: updateEmail, isLoading } = useUpdateEmail({
    onSuccess: (res: any) => {
      setCurrentEmail(res.new_email);
      toast.success(t('emailUpdated'));
    },
    onError: () => {
      setErrorText(t('emailAlreadyUsed'));
      setCountRender((prev) => prev + 1);
    },
  });
  const getEditState = (state: boolean) => {
    setEditActiveState(!state);
  };

  const onSubmit = async (data: UpdateEmail) => {
    if (!userProfile || !userId) return;
    data.user_id = userId;
    const isValid = updateEmailSchema.safeParse(data);
    if (!isValid.success) {
      setErrorText(t('somethingWentWrong'));
      setCountRender((prev) => prev + 1);
      return;
    }
    updateEmail(data);
  };

  return (
    <>
      <ErrorNotification
        message={errorText || t(errors?.email?.message as string)}
        interval={5000}
        triggerRender={countRender}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col pl-8 lg:pl-36 xl:w-1/2"
      >
        <div className="flex justify-between pr-3">
          <div className="flex w-full max-w-xs items-center gap-x-2.5 py-4">
            <div className="basis-7 text-primary-100">
              <SendIcon size={18} />
            </div>
            <div className="flex flex-grow flex-col gap-y-1">
              <label
                htmlFor="email"
                className="ml-2 block h-4 text-start text-xs font-medium 
              text-grey-sub-text"
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
          <input type="hidden" value={userId ?? 0} {...register('user_id')} />
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
            textContent={t('editEmail')}
          />
        )}
      </form>
    </>
  );
}

export default ResumeEmailInfos;
