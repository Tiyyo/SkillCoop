/*eslint-disable-next-line */
import { getCurrentLngInLocalStorage } from 'apps/client/src/utils/get-current-lng';

type ConversationCardTimeAgoProps = {
  lastMessageDate: string; // UTC ISO string
};

function ConversationCardTimeAgo({
  lastMessageDate,
}: ConversationCardTimeAgoProps) {
  const currentLng = getCurrentLngInLocalStorage();
  const today = new Date(); // local time
  const date = new Date(lastMessageDate); // UTC time

  const isToday = today.getDate() === date.getDate();
  const isMoreThan7DaysAgo = today.getDate() - date.getDate() > 7;

  const timeAgo = new Date(lastMessageDate).toLocaleString(`${currentLng}-EN`, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });
  const dateAgo = new Date(lastMessageDate).toLocaleString('us-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const dayAgo = new Date(lastMessageDate).toLocaleString('us-US', {
    weekday: 'short',
  });

  if (isToday) {
    return <span className="text-xs">{timeAgo}</span>;
  }
  if (!isMoreThan7DaysAgo) {
    return <span className="text-xs">{dayAgo}</span>;
  }
  return <span className="text-xs">{dateAgo}</span>;
}

export default ConversationCardTimeAgo;
