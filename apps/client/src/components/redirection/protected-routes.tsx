import { useApp } from '../../stores/app.store';
import LoadingPageNavFree from '../loading-page/page-nav-free';
import LandingPage from '../../features/home-page/landing-page';

function Protected({ children }: { children: React.ReactNode }) {
  const { isAuth, loading } = useApp();
  if (loading) return <LoadingPageNavFree />;

  return isAuth ? <>{children}</> : <LandingPage />;
}

export default Protected;
