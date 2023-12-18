import defaultAvatar from '../../../public/images/default-avatar.png';
import { cn } from '../../lib/utils';

type AvatarProps = {
  avatar?: string | null;
  isRatingActive?: boolean;
  className?: string;
};

function Avatar({ avatar, isRatingActive, className }: AvatarProps) {
  return (
    <img
      src={avatar ?? defaultAvatar}
      alt="avatar"
      className={cn(
        'w-9 h-9 lg:w-11 lg:h-11 aspect-square rounded-full',
        isRatingActive && 'cursor-pointer',
        className,
      )}
    />
  );
}

export default Avatar;
