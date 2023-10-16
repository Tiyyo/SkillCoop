import HomePage from '../../feature/home-page/home.page';
import { useApp } from '../../store/app.store';
import LoadingPage from '../loading-page';

function Protected({ children }: { children: React.ReactNode }) {
  const { isAuth, loading } = useApp();
  console.log('Is auth is :', isAuth);
  if (loading) return <LoadingPage />;

  return isAuth ? <>{children}</> : <HomePage />;
}

export default Protected;
