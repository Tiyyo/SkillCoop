import { cn } from '../../lib/utils';
import defaultAvatar from '../../../public/images/default-avatar.png';
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
    <div className="relative bg-primary-900 rounded-full z-10 w-14 h-14">
      <ImageWithFallback
        url={avatar ?? null}
        alt="profile avatar"
        className={cn(
          `w-[54px] aspect-square rounded-full border-base-light 
            border-4 absolute top-1/2 left-1/2 -translate-x-1/2 
            -translate-y-1/2`,
          isRatingActive && 'cursor-pointer',
          className,
        )}
      />
    </div>
  );
}

export default AvatarSmallWithBorder;
