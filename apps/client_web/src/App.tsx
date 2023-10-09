import Button from './component/button';
import { useMutation } from '@tanstack/react-query';
import { logoutUserFn } from './api/api.fn';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from './context/app.context';

function App() {
  const navigate = useNavigate();
  const stateContext = useStateContext();
  const { mutate: logoutUser } = useMutation(async () => await logoutUserFn());

  const handleLogout = async () => {
    logoutUser();
    stateContext.dispatch({ type: 'SET_IS_AUTH', payload: false });
    navigate('/login');
  };

  return (
    <div className="App">
      <Button
        textContent="Logout"
        onClick={handleLogout}
        type="button"
      />
    </div>
  );
}

export default App;
