import ImageWithFallback from '../image';

function AvatarRectangle({ avatar }: { avatar: string | null }) {
  return (
    <ImageWithFallback
      url={avatar}
      className="h-24 w-24 border-base-light 
                border-3 rounded-md"
      alt="avatar"
    />
  );
}

export default AvatarRectangle;
