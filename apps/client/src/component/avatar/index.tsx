import defaultAvatar from '../../../public/images/default-avatar.png';
import { cn } from '../../lib/utils';

function Avatar({
  avatar,
  isRatingActive,
}: {
  avatar?: string;
  isRatingActive?: boolean;
}) {
  return (
    <img
      src={avatar ?? defaultAvatar}
      alt="avatar"
      className={cn(
        'w-10 h-10 rounded-full',
        isRatingActive && 'cursor-pointer'
      )}
    />
  );
}

export default Avatar;
