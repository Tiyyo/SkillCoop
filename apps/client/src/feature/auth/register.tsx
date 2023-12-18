import { useMutation } from '@tanstack/react-query';
import { signUpUserFn } from '../../api/api.fn';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { registerSchema } from 'schema/ts-schema';
import Page from '../../layout/page';
import Center from '../../layout/center';
import SocialButton from '../../component/social-link';
import Google from '../../assets/icon/Google';
import getGoogleUrl from '../../utils/get-google-url';
import SeparatorLine from '../../component/seperator-line';
import FormField from '../../component/form-field';
import Button from '../../component/button';
import type { RegisterUser } from 'skillcoop-types';
import { useState } from 'react';
import checkIfString from '../../utils/check-string';
import ErrorContainer from '../../component/error';
import ErrorNotification from '../../component/error/notification';
import { AtSign, Eye, EyeOff } from 'lucide-react';

function Register() {
  const { mutate: signUpUser, isLoading } = useMutation({
    mutationFn: async (userData: RegisterUser) => signUpUserFn(userData),
    onSuccess: () => {
      navigate('/verify-email', { state: { email: currentEmail } });
    },
    onError: (error: any) => {
      setResponseErrorServer(error.response.data);
    },
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  const [responseErrorServer, setResponseErrorServer] = useState('');
  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUser>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterUser) => {
    const termAndServiceInString = data.termAndService ? 'on' : 'off';
    setCurrentEmail(data.email);
    signUpUser({
      email: data.email,
      password: data.password,
      confirmedPassword: data.confirmedPassword,
      termAndService: termAndServiceInString,
    });
  };

  return (
    <Page>
      <Center>
        <h1 className="py-4 text-xl font-bold text-primary-1100 text-center">
          Create your SkillCoop account
        </h1>
        <div className="flex flex-col w-[90%] max-w-lg bg-base-light py-7 px-6 rounded-lg">
          <ErrorNotification message={responseErrorServer} />
          <SocialButton value="Continue with google" href={getGoogleUrl(from)}>
            <Google />
          </SocialButton>
          <SeparatorLine />
          <form
            className="flex flex-col items-center gap-y-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              type="email"
              name="email"
              label="Email"
              error={checkIfString(errors.email?.message)}
              register={register}
            >
              <AtSign size={16} />
            </FormField>
            <FormField
              type="password"
              name="password"
              label="Password"
              subicon={<EyeOff size={16} />}
              error={checkIfString(errors.password?.message)}
              register={register}
            >
              <Eye size={16} />
            </FormField>
            <FormField
              type="password"
              name="confirmedPassword"
              label="Confirm your password"
              subicon={<EyeOff size={16} />}
              //TODO: find the right type
              error={checkIfString((errors as any).confirm?.message)}
              register={register}
            >
              <Eye size={16} />
            </FormField>
            <div className="text-xxs flex items-start self-start">
              <p>Password must contains</p>
              <ul className="list-disc ml-7">
                <li>8 characters</li>
                <li>1 number</li>
                <li>1 lowercase letter</li>
                <li>1 uppercase letter</li>
                <li>1 special characters</li>
              </ul>
            </div>
            <label
              htmlFor="termsAndService"
              className="text-xs text-opacity-70 text-center inline "
            >
              <input
                type="checkbox"
                value="on"
                className="mr-1"
                {...register('termAndService')}
              />
              By signing up, you agree to the
              <Link
                to="/terms-and-service"
                className="underline underline-offset-2 ml-1 text-primary-800 inline"
              >
                Terms and Service
              </Link>
            </label>
            <ErrorContainer
              errorValue={
                errors.termAndService
                  ? 'You have to accept Terms and Service'
                  : ''
              }
            />
            <Button
              textContent="Register"
              type="submit"
              isLoading={isLoading}
            />
          </form>
        </div>
        <p className="text-xs py-2">
          Already have an account ?{' '}
          <Link to="/login" className="text-primary-1000 font-bold">
            Log in
          </Link>
        </p>
      </Center>
    </Page>
  );
}

export default Register;
