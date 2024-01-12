import OnBoarding from '../../feature/onboarding';
import { useApp } from '../../store/app.store';

function AccessControlGateway({ children }: { children: React.ReactNode }) {
  const { isAuth, isFristConnection } = useApp();

  return isAuth && isFristConnection ? <OnBoarding /> : <>{children}</>;
}

export default AccessControlGateway;
