import HomePage from '../../feature/home-page/HomePage';
import { useApp } from '../../store/app.store';
import LoadingPage from '../loading-page';

function Protected({ children }: { children: React.ReactNode }) {
  const { isAuth, loading } = useApp();
  if (loading) return <LoadingPage />;

  return isAuth ? <>{children}</> : <HomePage />;
}

export default Protected;
