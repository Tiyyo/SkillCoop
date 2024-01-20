import { AuthorGroup } from '../../provisional-types';
import { getCurrentLngInLocalStorage } from '../../utils/get-current-lng';
import GroupAuthorMessage from './group-author-messages';

type GroupDateMessagesProps = {
  date: string;
  groupAuthor: AuthorGroup[];
  currentUserId: number;
};

function GroupDateMessages({
  date,
  groupAuthor,
  currentUserId,
}: GroupDateMessagesProps) {
  const currentLng = getCurrentLngInLocalStorage();
  const messagesDate = new Date(date).toLocaleString(`us-${currentLng}`, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return (
    <>
      <div className="flex my-4 w-full items-center">
        <span
          className="border border-slate-300 w-full flex-grow h-0.5
          border-opacity-10"
        ></span>
        <span
          className="mx-4 text-grey-regular font-light text-xs 
          whitespace-nowrap"
        >
          {messagesDate}
        </span>
        <span
          className="border border-slate-300 w-full flex-grow h-0.5
          border-opacity-10"
        ></span>
      </div>
      {groupAuthor &&
        groupAuthor.map((group, index) => (
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
