/*eslint-disable */
import { getCurrentLngInLocalStorage } from '../../../shared/utils/get-current-lng';
/*eslint-enable */

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
  const dateAgo = new Date(lastMessageDate).toLocaleString(`${currentLng}-US`, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const dayAgo = new Date(lastMessageDate).toLocaleString(`${currentLng}-US`, {
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
