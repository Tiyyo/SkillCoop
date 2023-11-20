import { Link } from 'react-router-dom';

function HeaderEventList({
  title,
  linkTo,
  linkOff,
}: {
  title: string;
  linkTo?: string;
  linkOff?: boolean;
}) {
  return (
    <div className="flex items-center justify-between pt-6 pb-2 px-3 lg:px-6 max-w-7xl w-full">
      <h2 className="text-sm lg:text-lg font-semibold text-primary-1100">
        {title}
      </h2>
      {!linkOff &&
        (linkTo ? (
          <Link to={linkTo} className="text-xs text-light">
            See more
          </Link>
        ) : (
          <div className="text-xs text-light">See more</div>
        ))}
    </div>
  );
}

export default HeaderEventList;
