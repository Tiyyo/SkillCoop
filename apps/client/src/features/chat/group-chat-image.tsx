import capitalize from '../../utils/capitalize';

type ConversationCardImageProps = {
  avatarUerOne: null | string;
  avatarUserTwo: null | string;
  usernameOne: string;
  usernameTwo: string;
};

function GroupChatImageWithUsernameFallback({
  avatarUerOne,
  avatarUserTwo,
  usernameOne,
  usernameTwo,
}: ConversationCardImageProps) {
  return (
    <div className="relative w-full h-full">
      {avatarUerOne ? (
        <img
          src={avatarUerOne}
          className="absolute top-0 right-0 aspect-square
            rounded-full w-2/3"
        />
      ) : (
        <div
          className="absolute top-0 right-0 aspect-square
          rounded-full w-2/3 bg-slate-200 bg-opacity-50 
          flex items-center justify-center"
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
            rounded-full w-2/3"
        />
      ) : (
        <div
          className="absolute bottom-0 left-0 aspect-square
          rounded-full w-2/3 bg-slate-200 bg-opacity-50 
          flex items-center justify-center"
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
