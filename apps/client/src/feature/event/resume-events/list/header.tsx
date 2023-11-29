import { Link } from 'react-router-dom';
import TitleH2 from '../../../../component/title-h2';
import Container from '../../../../layout/container';

function HeaderEventList({
  title,
  linkTo,
  linkOff,
  legendHeader,
}: {
  title: string;
  linkTo?: string;
  linkOff?: boolean;
  legendHeader?: string;
}) {
  return (
    <Container className="w-full flex items-center justify-between lg:my-4">
      <TitleH2 title={title} legend={legendHeader} />
      {!linkOff &&
        (linkTo ? (
          <Link to={linkTo} className="text-xs text-light">
            See more
          </Link>
        ) : (
          <div className="text-xs text-light">See more</div>
        ))}
    </Container>
  );
}

export default HeaderEventList;
