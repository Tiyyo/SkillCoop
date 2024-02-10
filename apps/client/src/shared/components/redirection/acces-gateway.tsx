import OnBoarding from '../../../features/onboarding';
import { useApp } from '../../../shared/store/app.store';

function AccessControlGateway({ children }: { children: React.ReactNode }) {
  const { isAuth, isFristConnection } = useApp();

  return isAuth && isFristConnection ? <OnBoarding /> : <>{children}</>;
}

export default AccessControlGateway;
