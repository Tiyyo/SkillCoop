import { AuthorGroupMessages } from 'packages/types/src';
import { getCurrentLngInLocalStorage } from '../../../../utils/get-current-lng';
import GroupAuthorMessage from './messages.by-author';

type GroupDateMessagesProps = {
  date: string;
  authorGroups: AuthorGroupMessages[];
  currentUserId: number | null;
};

function GroupDateMessages({
  date,
  authorGroups,
  currentUserId,
}: GroupDateMessagesProps) {
  const currentLng = getCurrentLngInLocalStorage();
  const messagesDate = new Date(date).toLocaleString(`${currentLng}-US`, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return (
    <>
      <div className="my-4 flex w-full items-center">
        <span
          className="h-0.5 w-full flex-grow border border-slate-300
          border-opacity-10"
        ></span>
        <span
          className="mx-4 whitespace-nowrap text-xs font-light 
          text-grey-regular"
        >
          {messagesDate}
        </span>
        <span
          className="h-0.5 w-full flex-grow border border-slate-300
          border-opacity-10 "
        ></span>
      </div>
      {authorGroups &&
        authorGroups.map((group, index) => (
          <GroupAuthorMessage
            messages={group.messages}
            userId={group.user_id}
            username={group.username}
            avatar={group.avatar}
            currentUserId={currentUserId}
            key={index}
          />
        ))}
    </>
  );
}

export default GroupDateMessages;
