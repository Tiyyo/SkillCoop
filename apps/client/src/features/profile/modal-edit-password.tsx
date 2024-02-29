import { Eye, EyeOff } from 'lucide-react';
import FormField from '../../shared/components/form-field';
import { Dialog, DialogContent, DialogTrigger } from '../../lib/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordUpdateSchema } from '@skillcoop/schema/src';
import { useMutation } from '@tanstack/react-query';
import { updatePasswordFn } from '../../api/api.fn';
import { useApp } from '../../shared/store/app.store';
import toast from '../../shared/utils/toast';
import { useTranslation } from 'react-i18next';

type UpdatePasswordField = {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
  user_id: string;
};

function EditModalPassword({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation('system');
  const { userId } = useApp();
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
    if (!userId) return;
    data.user_id = userId;
    const isValid = passwordUpdateSchema.safeParse(data);

    if (!isValid.success) {
      return;
    }
    updatePassword(data);
  };
  return (
    <Dialog>
      <DialogTrigger className="h-full self-start py-3">
        {children}
      </DialogTrigger>
      <DialogContent className="bg-base-light">
        <form
          className="flex flex-col gap-4 py-4"
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
            className="cursor-pointerhover:bg-base my-1 w-fit self-center 
            rounded-lg px-8 py-2.5 text-primary-700 transition-all 
            duration-200"
          >
            {t('editPassword')}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditModalPassword;
