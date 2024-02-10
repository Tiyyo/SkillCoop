import { cn } from '../../../lib/utils';
import ImageWithFallback from '../image';

type AvatarProps = {
  avatar?: string | null;
  isRatingActive?: boolean;
  className?: string;
  size?: number;
};

function Avatar({ avatar, isRatingActive, className, size }: AvatarProps) {
  return (
    <ImageWithFallback
      url={avatar ?? null}
      alt="profile avatar"
      size={size ?? 40}
      className={cn(
        'aspect-square h-9 w-9 rounded-full lg:h-11 lg:w-11',
        isRatingActive && 'cursor-pointer',
        className,
      )}
    />
  );
}

export default Avatar;
