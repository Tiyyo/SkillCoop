import { Eye, EyeOff } from 'lucide-react';
import FormField from '../../component/form-field';
import { Dialog, DialogContent, DialogTrigger } from '../../lib/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordUpdateSchema } from '@skillcoop/schema/src';
import { useMutation } from '@tanstack/react-query';
import { updatePasswordFn } from '../../api/api.fn';
import { useApp } from '../../store/app.store';
import toast from '../../utils/toast';
import { useTranslation } from 'react-i18next';

type UpdatePasswordField = {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
  user_id: number;
};

function EditModalPassword({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation('system');
  const { userProfile } = useApp();
  //should be in a hook
  const { mutate: updatePassword } = useMutation({
    mutationFn: async (data: UpdatePasswordField) => {
      return updatePasswordFn(data);
    },
    onSuccess: () => {
      toast.success(t('passwordUpdated'));
    },
    onError: () => {
      toast.error(t('somethingWentWrong'));
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordField>({
    resolver: zodResolver(passwordUpdateSchema),
  });

  const onSubmit = async (data: UpdatePasswordField) => {
    if (!userProfile?.user_id) return;
    data.user_id = userProfile.user_id;
    const isValid = passwordUpdateSchema.safeParse(data);

    if (!isValid.success) {
      return;
    }
    updatePassword(data);
  };
  return (
    <Dialog>
      <DialogTrigger className="self-start py-3 h-full">
        {children}
      </DialogTrigger>
      <DialogContent className="bg-base-light">
        <form
          className="py-4 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            name="old_password"
            type="password"
            label={t('yourOldPassword')}
            subicon={<EyeOff size={18} />}
            register={register}
          >
            <Eye size={18} />
          </FormField>
          <FormField
            name="new_password"
            type="password"
            label={t('newPassword')}
            subicon={<EyeOff size={18} />}
            error={
              (errors?.new_password?.message as string) ||
              (errors?.old_password?.message as string)
            }
            register={register}
          >
            <Eye size={18} />
          </FormField>
          <FormField
            name="confirm_new_password"
            type="password"
            label={t('confirmNewPassword')}
            subicon={<EyeOff size={18} />}
            error={errors?.confirm_new_password?.message as string}
            register={register}
          >
            <Eye size={18} />
          </FormField>
          <button
            type="submit"
            className="text-primary-700 my-1 py-2.5 px-8 w-fit self-center 
            cursor-pointerhover:bg-base duration-200 transition-all 
            rounded-lg"
          >
            {t('editPassword')}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditModalPassword;
