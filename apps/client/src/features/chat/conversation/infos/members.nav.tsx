import { ChevronLeft, ChevronRight } from 'lucide-react';

type InfosMembersNavProps = {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function InfosMembersNav({ handleClick }: InfosMembersNavProps) {
  return (
    <>
      {' '}
      <button onClick={handleClick} value="left">
        <ChevronLeft
          size={14}
          className="aspect-square rounded-full bg-grey-off
             text-primary-100"
        />
      </button>
      <button onClick={handleClick} value="right">
        <ChevronRight
          size={14}
          className="aspect-square rounded-full bg-grey-off
             text-primary-100"
        />
      </button>
    </>
  );
}

export default InfosMembersNav;
