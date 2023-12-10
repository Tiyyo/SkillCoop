import { PlusIcon } from 'lucide-react';
import TitleH1 from '../title-h1';
import { Link } from 'react-router-dom';
import Container from '../../layout/container';

type SubHeaderProps = {
  title: string;
  isPlusExist?: boolean;
  linkFromPlus?: string;
  textButton?: string;
  legend?: string;
};

function SubHeader({
  title,
  isPlusExist,
  linkFromPlus,
  textButton,
  legend,
}: SubHeaderProps) {
  return (
    <Container className="lg:my-2 flex justify-between w-full">
      <TitleH1 title={title} legend={legend} />
      {isPlusExist && linkFromPlus && textButton && (
        <Link
          to={linkFromPlus}
          className="flex self-center items-center justify-center h-7 w-7
              lg:w-fit lg:h-11 lg:px-5
              lg:py-4 rounded-full sm:rounded-3xl
             bg-primary-100 text-white hover:bg-primary-600 hover:text-dark
              duration-300 font-medium text-xs lg:text-sm "
        >
          <PlusIcon size={24} />
          <p className="hidden lg:block text-center">{textButton}</p>
        </Link>
      )}
    </Container>
  );
}

export default SubHeader;
