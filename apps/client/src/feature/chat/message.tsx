import { useApp } from '../../store/app.store';

type MessageProps = {
  messageId: number;
  content: string;
  avatar: string | null;
  date: string;
  senderId: number;
  username: string;
};

function Message({ content, date, senderId, username }: MessageProps) {
  const { userId } = useApp();
  const ownMessageVariant = `message owned bg-accent-100 
  self-end pr-14 relative`;
  const receivedMessageVariant =
    'message received bg-primary-300 self-start relative ';

  // const [messageDate, setMessageDate] = useState();

  const messageTimeFormatted = new Intl.DateTimeFormat('fr-FR', {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'Europe/Paris',
  }).format(new Date(date));

  const messageDateFormatted = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

  // to ensure to format a date even if the date is not defined
  // useEffect(() => {
  //   if (!date) return;
  //   setMessageDate(date);
  // }, [date]);

  return (
    <>
      {
        <p
          className="text-secondary-500 mx-auto w-fit rounded-lg px-2 
          py-1.5 text-center text-xs opacity-80"
        >
          {messageDateFormatted}
        </p>
      }
      <>
        <div
          className={`${
            senderId === userId ? ownMessageVariant : receivedMessageVariant
          } `}
        >
          {userId && (
            <span
              className={`absolute -top-4 ${
                senderId === userId ? 'left-1 ' : 'right-1'
              }  text-xs opacity-60`}
            >
              {username}
            </span>
          )}
          {senderId !== userId && (
            <img
              className="absolute -left-5 bottom-1 h-8 w-8 rounded-full
              p-1 ring-2 ring-gray-300 dark:ring-gray-500"
              src="/profile_picture.jpg"
              alt="Bordered avatar"
            ></img>
          )}
          {content}
          <p className="text-right text-xs opacity-30">
            {messageTimeFormatted}
          </p>
        </div>
      </>
    </>
  );
}

export default Message;
