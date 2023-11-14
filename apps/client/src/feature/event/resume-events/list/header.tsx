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
    <div className="flex justify-between pt-6 pb-2 px-3">
      <h2 className="text-sm font-semibold text-primary-1100">{title}</h2>
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
