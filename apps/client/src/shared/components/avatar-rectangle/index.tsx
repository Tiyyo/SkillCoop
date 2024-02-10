import ImageWithFallback from '../image';

function AvatarRectangle({ avatar }: { avatar: string | null }) {
  return (
    <ImageWithFallback
      url={avatar}
      size={96}
      className="rounded-md border-3 border-base-light bg-primary-20"
      alt="avatar"
    />
  );
}

export default AvatarRectangle;
