import HomePageV2 from '../../feature/home-page/home-v2';
import HomePage from '../../feature/home-page/home.page';
import { useApp } from '../../store/app.store';
import LoadingPage from '../loading-page';

function Protected({ children }: { children: React.ReactNode }) {
  const { isAuth, loading } = useApp();
  if (loading) return <LoadingPage />;

  return isAuth ? <>{children}</> : <HomePageV2 />;
}

export default Protected;
