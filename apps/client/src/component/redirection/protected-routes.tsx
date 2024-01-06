import { useApp } from '../../store/app.store';
import LoadingPage from '../loading-page';
import LandingPage from '../../feature/home-page/landing-page';

function Protected({ children }: { children: React.ReactNode }) {
  const { isAuth, loading } = useApp();
  console.log('isAuth', loading);
  if (loading) return <LoadingPage />;

  return isAuth ? <>{children}</> : <LandingPage />;
}

export default Protected;
