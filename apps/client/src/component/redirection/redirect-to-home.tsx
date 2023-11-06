import { Navigate } from 'react-router-dom';
import { useApp } from '../../store/app.store';

function RedirectToHome({ children }: { children: React.ReactNode }) {
  const { isAuth } = useApp();

  // TODO : handle loading causing infinite loop
  // if (loading) return <LoadingPage />;

  return isAuth ? <Navigate to="/" /> : <>{children}</>;
}

export default RedirectToHome;
