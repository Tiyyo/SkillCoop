import defaultAvatar from '../../../public/images/default-avatar.png';
import { cn } from '../../lib/utils';

function Avatar({
  avatar,
  isRatingActive,
}: {
  avatar?: string | null;
  isRatingActive?: boolean;
}) {
  return (
    <img
      src={avatar ?? defaultAvatar}
      alt="avatar"
      className={cn(
        'w-9 h-9 lg:w-11 lg:h-11 aspect-square rounded-full',
        isRatingActive && 'cursor-pointer',
      )}
    />
  );
}

export default Avatar;
