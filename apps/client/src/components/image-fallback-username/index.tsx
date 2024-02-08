import capitalize from '../../utils/capitalize';

function ImageWithUsernamefallback({
  avatar,
  username,
  size,
}: {
  avatar: null | string;
  username: string;
  size?: number;
}) {
  return avatar ? (
    <img
      src={avatar}
      alt={`${username}`}
      style={
        size
          ? { height: `${size}px`, width: `${size}px` }
          : { height: '40px', width: '40px' }
      }
      className="aspect-square 
          overflow-hidden rounded-full"
    />
  ) : (
    <div
      className="border-1 flex aspect-square 
       items-center justify-center rounded-full
       bg-slate-200 bg-opacity-50"
      style={
        size
          ? { height: `${size}px`, width: `${size}px` }
          : { height: '40px', width: '40px' }
      }
    >
      <p className="text-xl font-medium text-slate-600 text-opacity-50">
        {capitalize(username[0])}
      </p>
    </div>
  );
}

export default ImageWithUsernamefallback;
