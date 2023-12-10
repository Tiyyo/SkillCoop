import { useMutation } from '@tanstack/react-query';
import Button from '../../component/button';
import FormField from '../../component/form-field';
import Center from '../../layout/center';
import Page from '../../layout/page';
import { forgotPasswordFn } from '../../api/api.fn';
import { emailSchema } from 'schema/ts-schema';
import { useState } from 'react';
import envelope from '../../assets/svg/envelope.svg';
import { Link } from 'react-router-dom';
import ErrorNotification from '../../component/error/notification';

function ForgotPassword() {
  const [hasBeenSent, setHasBeenSent] = useState(false);
  const [error, setError] = useState('');
  const { mutate: sendEmailWithResetLink, isLoading } = useMutation({
    mutationFn: async (email: string) => {
      return forgotPasswordFn(email);
    },
    onSuccess: () => {
      setHasBeenSent(true);
    },
    onError: () => {
      setError('This email is not associated with an account');
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email: e.currentTarget.email.value,
    };
    const isValid = emailSchema.safeParse(data);
    if (!isValid.success) {
      setError('This is not a valid email');
    } else {
      sendEmailWithResetLink(data.email);
    }
  };
  return (
    <Page>
      <Center>
        <h1 className="text-lg my-4 font-semibold opacity-30 text-primary-1100">
          Reset your password
        </h1>
        {!hasBeenSent ? (
          <form
            className="flex flex-col items-center gap-y-5 p-6 bg-base-light 
            max-w-lg rounded-sm w-3/4"
            onSubmit={handleSubmit}
          >
            <p className="self-start text-sm text-primary-1100">
              Enter the email adress associated with your account.
            </p>
            <p className="self-start text-sm text-primary-1100">
              If you have a verified email adress, you will received an email to
              reset your password.
            </p>
            <ErrorNotification message={error} />
            <FormField name="email" label="Email adress" />
            <Button
              textContent="Reset my password"
              type="submit"
              className="text-sm"
              isLoading={isLoading}
            />
          </form>
        ) : (
          <div
            className="flex flex-col items-center gap-y-5 p-6 bg-base-light 
            max-w-lg rounded-sm w-3/4 text-center text-sm"
          >
            <p className="text-xs font-light text-center">
              If there is an account linked to this email, you will receive an
              email.
            </p>
            <img src={envelope} className="h-14" alt="envelope" />
            <p>An email has been sent; you can now reset your password.</p>
            <p>The reception of this email may take a few minutes.</p>

            <Link
              to="/login"
              className="py-2 cursor-pointer duration-200 
              transition-all rounded-md bg-primary-800 hover:bg-primary-900
             text-white  px-3 w-[70%] 
                 max-w-xs font-bold uppercase shadow-sm tracking-wide"
            >
              I understood
            </Link>
          </div>
        )}
      </Center>
    </Page>
  );
}

export default ForgotPassword;
