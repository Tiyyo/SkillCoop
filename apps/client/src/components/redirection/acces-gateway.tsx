import OnBoarding from '../../features/onboarding';
import { useApp } from '../../stores/app.store';

function AccessControlGateway({ children }: { children: React.ReactNode }) {
  const { isAuth, isFristConnection } = useApp();

  return isAuth && isFristConnection ? <OnBoarding /> : <>{children}</>;
}

export default AccessControlGateway;
