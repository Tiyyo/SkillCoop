import { useNavigate } from 'react-router-dom';
import Return from '../../assets/icon/Return';

interface ReturnBtnProps {
  to?: string;
}

function ReturnBtn({ to }: ReturnBtnProps) {
  const navigate = useNavigate();
  const handleClickReturn = () => {
    let destination: string = '-1';
    if (to) {
      destination = to;
    }
    navigate(destination);
  };
  return (
    <button
      onClick={handleClickReturn}
      className="py-2 px-3 text-light">
      <Return />
    </button>
  );
}

export default ReturnBtn;
