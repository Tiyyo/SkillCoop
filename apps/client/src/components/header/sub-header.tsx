import { PlusIcon } from 'lucide-react';
import TitleH1 from '../title-h1';
import { Link } from 'react-router-dom';
import Container from '../../shared/layouts/container';

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
    <Container className="flex w-full justify-between lg:my-2 lg:rounded-lg">
      <TitleH1 title={title} legend={legend} />
      {isPlusExist && linkFromPlus && textButton && (
        <Link
          to={linkFromPlus}
          className="flex h-7 w-7 items-center justify-center self-center
              rounded-full bg-primary-100 text-xs
              font-medium text-white duration-300
             hover:bg-primary-600 hover:text-dark sm:rounded-3xl lg:h-11
              lg:w-fit lg:px-5 lg:py-4 lg:text-sm"
        >
          <PlusIcon size={24} />
          <p className="hidden text-center lg:block">{textButton}</p>
        </Link>
      )}
    </Container>
  );
}

export default SubHeader;
