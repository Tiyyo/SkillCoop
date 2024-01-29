import { cn } from '../../lib/utils';
import ImageWithFallback from '../image';

type AvatarWithBorderProps = {
  avatar?: string | null;
  isRatingActive?: boolean;
  className?: string;
  size?: string;
  borderSize?: string;
};

function AvatarWithBorder({
  avatar,
  isRatingActive,
  className,
}: AvatarWithBorderProps) {
  return (
    <div className="relative z-10 h-20 w-20 rounded-full bg-primary-900">
      <ImageWithFallback
        url={avatar ?? null}
        alt="profile avatar"
        size={76}
        className={cn(
          `absolute left-1/2 top-1/2 aspect-square w-18.5 -translate-x-1/2
               -translate-y-1/2 rounded-full border-4 border-base-light`,
          isRatingActive && 'cursor-pointer',
          className,
        )}
      />
    </div>
  );
}

export default AvatarWithBorder;
