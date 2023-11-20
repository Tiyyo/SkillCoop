import { useMutation } from '@tanstack/react-query';
import Button from '../../component/button';
import ErrorContainer from '../../component/error';
import FormField from '../../component/form-field';
import Center from '../../layout/center';
import Page from '../../layout/page';

function ForgotPassword() {
  const { mutate, isLoading } = useMutation({
    mutationFn: async (email: string) => {},
    onSuccess: () => {},
    onError: () => {},
  });
  return (
    <Page>
      <Center>
        <form
          className="flex flex-col items-center gap-y-5 p-6 bg-base-light 
            max-w-lg rounded-sm w-3/4"
        >
          <p className="self-start text-sm text-primary-1100">
            Enter the email adress associated with your account.
          </p>
          <p className="self-start text-sm text-primary-1100">
            If you have a verified email adress, you will received an email to
            reset your password.
          </p>
          <ErrorContainer />
          <FormField name="email" label="Email adress" />
          <Button
            textContent="Reset my password"
            type="submit"
            className="text-sm"
          />
        </form>
      </Center>
    </Page>
  );
}

export default ForgotPassword;
