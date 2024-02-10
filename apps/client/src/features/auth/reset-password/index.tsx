import Page from '../../../shared/layouts/page';
import Center from '../../../shared/layouts/center';
import FormField from '../../../components/form-field';
import Button from '../../../components/button';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PasswordStrengthMeter from '../../../components/password-strenght-meter';
import useResetPassword from '../hooks/useResetPassword';

function ResetPassword() {
  const { t } = useTranslation('auth');
  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    isLoading,
    linkHasExpire,
    hasBeenReset,
    currentPassword,
    trackPasswordChangeValue,
  } = useResetPassword();

  return (
    <Page>
      <Center>
        <h1 className="my-4 text-lg font-semibold text-primary-1100 opacity-30">
          {t('resetYourPassword')}
        </h1>
        <form
          className="flex w-3/4 max-w-lg flex-col items-center gap-y-5 
            rounded-sm bg-base-light p-6"
          onSubmit={handleSubmit(onSubmit)}
          onChange={trackPasswordChangeValue}
        >
          {linkHasExpire && (
            <div className="flex flex-col items-center">
              <p className="text-center text-sm text-primary-1100">
                {t('yourLinkHaveExpired')}
              </p>
              <Link
                to="/forgot-password"
                className="my-3 w-fit cursor-pointer self-center 
                rounded-md px-8 py-2 text-primary-700 transition-all 
                duration-200 hover:bg-base"
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
                label={t('confirmYourPassword')}
                type="password"
                register={register}
                error={errors?.confirmPassword?.message as string}
              />
              <PasswordStrengthMeter password={currentPassword} />
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
              <p className="text-center text-sm text-primary-1100">
                {t('successfulResetPassword')}
              </p>
              <Link
                to="/login"
                className="self-centerhover:bg-base my-3 w-fit cursor-pointer 
                rounded-md px-8 py-2 text-center text-primary-700 
                transition-all duration-200"
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
