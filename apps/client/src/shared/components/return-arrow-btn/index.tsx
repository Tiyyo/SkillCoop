import { ArrowLeft } from 'lucide-react';

function ReturnArrowBtn({
  onClick,
  condition,
}: {
  onClick: (args: any) => void;
  condition?: any;
}) {
  const handleClick = () => {
    return onClick(condition);
  };
  return (
    <button
      className="flex aspect-square cursor-pointer items-center 
          justify-center rounded-full border border-border border-opacity-10 
          p-1.5 text-primary-800 shadow"
      onClick={handleClick}
    >
      <ArrowLeft size={18} />
    </button>
  );
}

export default ReturnArrowBtn;
