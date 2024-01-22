import { cn } from '../../lib/utils';
import ImageWithFallback from '../image';

type AvatarProps = {
  avatar?: string | null;
  isRatingActive?: boolean;
  className?: string;
};

function Avatar({ avatar, isRatingActive, className }: AvatarProps) {
  return (
    <ImageWithFallback
      url={avatar ?? null}
      alt="profile avatar"
      className={cn(
        'w-9 h-9 lg:w-11 lg:h-11 aspect-square rounded-full',
        isRatingActive && 'cursor-pointer',
        className,
      )}
    />
  );
}

export default Avatar;
