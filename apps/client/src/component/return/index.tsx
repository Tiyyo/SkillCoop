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
      className=" hidden absolute top-16 right-4 lg:my-0 
            lg:mx-0 lg:flex justify-center 
            items-center lg:-right-5 lg:top-16 
            lg:h-10 lg:w-10 w-8 h-8 bg-dark border z-10
           border-grey-off border-opacity-40 rounded-full cursor-pointer"
    >
      <ChevronsLeft size={24} className="text-grey-off opacity-80" />
    </button>
  );
}

export default ReturnBtn;
