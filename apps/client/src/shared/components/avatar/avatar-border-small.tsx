import { cn } from '../../../lib/utils';
import ImageWithFallback from '../image';

type AvatarSmallWithBorderProps = {
  avatar?: string | null;
  isRatingActive?: boolean;
  className?: string;
  size?: string;
  borderSize?: string;
};

function AvatarSmallWithBorder({
  avatar,
  isRatingActive,
  className,
}: AvatarSmallWithBorderProps) {
  return (
    <div className="relative z-10 h-14 w-14 rounded-full bg-primary-900">
      <ImageWithFallback
        url={avatar ?? null}
        alt="profile avatar"
        size={54}
        className={cn(
          `absolute left-1/2 top-1/2 aspect-square 
            w-[54px] -translate-x-1/2 -translate-y-1/2 rounded-full border-4 
            border-base-light`,
          isRatingActive && 'cursor-pointer',
          className,
        )}
      />
    </div>
  );
}

export default AvatarSmallWithBorder;
