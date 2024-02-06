import { useNavigate } from 'react-router-dom';
import { queryClient } from '../main';
import { Profile } from 'packages/types/src';

type ResponseGetMeFn =
  | 'Unecessary call'
  | { userProfile?: Profile; userId: number }
  | undefined;

type useAuthRedirectionProps = {
  loading: boolean;
  isAuthenticated: boolean;
  isFristConnection: boolean | undefined;
  responseGetProfile: ResponseGetMeFn;
};

export default function useAuthRedirection({
  loading,
  isAuthenticated,
  isFristConnection,
  responseGetProfile,
}: useAuthRedirectionProps) {
  const navigate = useNavigate();

  if (loading && isAuthenticated && isFristConnection) {
    if (responseGetProfile === 'Unecessary call' || !responseGetProfile) {
      return;
    }
    return navigate(`/onboarding/${responseGetProfile.userId}`);
  }

  if (loading && isAuthenticated && isFristConnection === false) {
    queryClient.setQueryData(['auth-user'], (oldData: any) => {
      if (
        responseGetProfile !== 'Unecessary call' &&
        responseGetProfile?.userProfile &&
        oldData
      ) {
        return {
          ...oldData,
          ...responseGetProfile.userProfile,
        };
      } else {
        return oldData;
      }
    });
    return navigate('/');
  }
}
