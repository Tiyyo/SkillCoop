import { useNavigate } from 'react-router-dom';
import { ChevronsLeft } from 'lucide-react';

type ReturnBtnProps = {
  to?: string;
};

function ReturnBtn({ to }: ReturnBtnProps) {
  const navigate = useNavigate();
  const handleClickReturn = () => {
    let destination: number | string = -1;
    if (to) {
      destination = to;
    }
    //@ts-ignore
    navigate(destination);
  };
  return (
    <button
      onClick={handleClickReturn}
      type="button"
      className="absolute right-4 top-16 z-10 hidden h-8 
            w-8 animate-opacity-in cursor-pointer 
            items-center justify-center rounded-full 
            border border-grey-off border-opacity-40 bg-dark opacity-0 
            lg:-right-5 lg:top-16 lg:mx-0 lg:my-0 lg:flex lg:h-10
            lg:w-10
            "
    >
      <ChevronsLeft size={24} className="text-grey-off opacity-80" />
    </button>
  );
}

export default ReturnBtn;
