import capitalize from '../../utils/capitalize';

function ImageWithUsernamefallback({
  avatar,
  username,
}: {
  avatar: null | string;
  username: string;
}) {
  return avatar ? (
    <img
      src={avatar}
      alt={`${username}`}
      className="aspect-square 
          overflow-hidden rounded-full"
    />
  ) : (
    <div
      className="border-1 flex aspect-square 
        w-full items-center justify-center rounded-full
       bg-slate-200 bg-opacity-50"
    >
      <p className="text-xl font-medium text-slate-600 text-opacity-50">
        {capitalize(username[0])}
      </p>
    </div>
  );
}

export default ImageWithUsernamefallback;
