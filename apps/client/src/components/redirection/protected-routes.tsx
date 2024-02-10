import { useApp } from '../../shared/store/app.store';
import LoadingPageNavFree from '../loading-page/page-nav-free';
import LandingPage from '../../features/landing-page';

function Protected({ children }: { children: React.ReactNode }) {
  const { isAuth, loading } = useApp();
  if (loading) return <LoadingPageNavFree />;

  return isAuth ? <>{children}</> : <LandingPage />;
}

export default Protected;
