import Page from '../../layout/page';
import Center from '../../layout/center';
import FormField from '../../component/form-field';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from 'schema/ts-schema';
import { useMutation } from '@tanstack/react-query';
import { resetPasswordFn } from '../../api/api.fn';
import Button from '../../component/button';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { ResetPassword } from '@skillcoop/types';
=======
import { ResetPassword } from 'skillcoop-types';
import { useTranslation } from 'react-i18next';
>>>>>>> aa5cf6df31348fffebf5a3aa2a2bdf2e309550e8

function ResetPassword() {
  const { t } = useTranslation();
  const [hasBeenReset, setHasBeenReset] = useState(false);
  const [linkHasExpire, setLinkHasExpire] = useState(false);
  const { mutate: resetPassword, isLoading } = useMutation({
    mutationFn: async (data: ResetPassword) => {
      return resetPasswordFn(data);
    },
    onSuccess: (response) => {
      if (response.message !== 'expire') {
        return setHasBeenReset(true);
      }
      setLinkHasExpire(true);
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPassword) => {
    resetPassword(data);
  };

  return (
    <Page>
      <Center>
        <h1 className="text-lg my-4 font-semibold opacity-30 text-primary-1100">
          {t('resetYourPassword')}
        </h1>
        <form
          className="flex flex-col items-center gap-y-5 p-6 bg-base-light 
            max-w-lg rounded-sm w-3/4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {linkHasExpire && (
            <div className="flex flex-col items-center">
              <p className="text-center text-primary-1100 text-sm">
                {t('yourLinkHaveExpired')}
              </p>
              <Link
                to="/forgot-password"
                className="py-2 cursor-pointer duration-200 transition-all 
                  rounded-md text-primary-700 my-3 px-8 w-fit self-center 
                hover:bg-base"
              >
                {t('forgotPassword')} ?
              </Link>
            </div>
          )}
          {!hasBeenReset && !linkHasExpire && (
            <>
              <FormField
                name="password"
                label={t('password')}
                type="password"
                subicon={<EyeOff size={18} />}
                register={register}
                error={errors?.password?.message as string}
              >
                <Eye size={18} />
              </FormField>
              <FormField
                name="confirmPassword"
                label={t('confirmPassword')}
                type="password"
                register={register}
                error={errors?.confirmPassword?.message as string}
              />
              <Button
                textContent={t('resetMyPassword')}
                type="submit"
                className="text-sm"
                isLoading={isLoading}
              />
            </>
          )}
          {hasBeenReset && !linkHasExpire && (
            <div className="flex flex-col items-center">
              <p className="text-center text-primary-1100 text-sm">
                {t('successfulResetPassword')}
              </p>
              <Link
                to="/login"
                className="py-2 cursor-pointer duration-200 transition-all 
                  rounded-md text-primary-700 my-3 px-8 w-fit self-center 
                hover:bg-base"
              >
                {t('gotToLoginPage')}
              </Link>
            </div>
          )}
        </form>
      </Center>
    </Page>
  );
}

export default ResetPassword;
