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
      className="overflow-hidden 
          rounded-full aspect-square"
    />
  ) : (
    <div
      className="w-full aspect-square rounded-full border-1 
          flex items-center justify-center bg-slate-200 bg-opacity-50"
    >
      <p className="text-xl font-medium text-slate-600 text-opacity-50">
        {capitalize(username[0])}
      </p>
    </div>
  );
}

export default ImageWithUsernamefallback;
