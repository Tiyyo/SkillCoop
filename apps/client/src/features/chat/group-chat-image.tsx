import { cn } from '../../lib/utils';
import capitalize from '../../utils/capitalize';

type ConversationCardImageProps = {
  avatarUerOne: null | string;
  avatarUserTwo: null | string;
  usernameOne: string;
  usernameTwo: string;
  size?: number;
};

function GroupChatImageWithUsernameFallback({
  avatarUerOne,
  avatarUserTwo,
  usernameOne,
  usernameTwo,
  size,
}: ConversationCardImageProps) {
  console.log(size, 'SIZE');
  return (
    <div
      className={cn(`aspect-ratio relative `)}
      style={
        size
          ? { height: `${size}px`, width: `${size}px` }
          : { height: '56px', width: '56px' }
      }
    >
      {avatarUerOne ? (
        <img
          src={avatarUerOne}
          className="absolute right-0 top-0 aspect-square
            w-3/4 rounded-full"
        />
      ) : (
        <div
          className="absolute right-0 top-0 flex
          aspect-square w-3/4 items-center justify-center 
          rounded-full bg-slate-200 bg-opacity-50"
        >
          <p className="text-xl font-medium text-slate-600 text-opacity-50">
            {capitalize(usernameOne[0])}
          </p>
        </div>
      )}
      {avatarUserTwo ? (
        <img
          src={avatarUserTwo}
          className="absolute bottom-0 left-0 aspect-square
            w-3/4 rounded-full border-2 border-base-light"
        />
      ) : (
        <div
          className="absolute bottom-0 left-0 flex
          aspect-square w-3/4 items-center justify-center 
          rounded-full border-2 border-base-light bg-slate-200 bg-opacity-50"
        >
          <p className="text-xl font-medium text-slate-600 text-opacity-50">
            {capitalize(usernameTwo[0])}
          </p>
        </div>
      )}
    </div>
  );
}

export default GroupChatImageWithUsernameFallback;
