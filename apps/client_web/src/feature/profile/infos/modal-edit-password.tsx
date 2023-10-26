import { Eye, EyeOff } from 'lucide-react';
import FormField from '../../../component/form-field';
import { Dialog, DialogContent, DialogTrigger } from '../../../lib/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import schema from 'schema';
import { useMutation } from '@tanstack/react-query';
import { updatePasswordFn } from '../../../api/api.fn';
import { useApp } from '../../../store/app.store';
const { passwordSchema } = schema;

function EditModalPassword() {
  const { userProfile } = useApp();
  const { mutate } = useMutation((data) => updatePasswordFn(data));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  console.log(errors);
  const onSubmit = async (data: any) => {
    data.user_id = userProfile?.user_id;
    mutate(data);
  };
  return (
    <Dialog>
      <DialogTrigger className="text-center text-xs underline underline-offset-4 mx-auto w-full">
        Edit your password
      </DialogTrigger>
      <DialogContent className="bg-base-light">
        <form
          className="py-4 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}>
          <FormField
            name="old_password"
            type="password"
            label="your old password"
            subicon={<EyeOff size={18} />}
            register={register}>
            <Eye size={18} />
          </FormField>
          <FormField
            name="new_password"
            type="password"
            label="New password"
            subicon={<EyeOff size={18} />}
            register={register}>
            <Eye size={18} />
          </FormField>
          <FormField
            name="confirm_new_password"
            type="password"
            label="Confirm your new password"
            subicon={<EyeOff size={18} />}
            register={register}>
            <Eye size={18} />
          </FormField>
          <button
            type="submit"
            className="text-primary-700 my-1 py-2.5 px-8 w-fit self-center cursor-pointer hover:bg-base duration-200 transition-all rounded-lg">
            Edit password
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditModalPassword;