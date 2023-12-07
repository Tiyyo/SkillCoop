import { useQuery } from '@tanstack/react-query';
import { getNotificationFn } from '../../api/api.fn';
import { useApp } from '../../store/app.store';
import Header from '../../component/header';
import Container from '../../layout/container';
import TitleH2 from '../../component/title-h2';
import DispatchNotifications from './dispatch';
import { useState } from 'react';
import { cn } from '../../lib/utils';

function NotificationContainer() {
  const [activeFilter, setActiveFilter] = useState<string>(''); // ['all', 'events', 'friends'
  const { userProfile } = useApp();

  const {
    data: notifications,
    isLoading,
    isFetching,
    isError,
  } = useQuery(['notifications'], () => {
    {
      if (!userProfile?.profile_id) return null;
      return getNotificationFn(userProfile?.profile_id);
    }
  });

  const handleClickFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    console.log(value);
    setActiveFilter(value);
  };
  if (!notifications) return null;
  if (notifications && notifications.length === 0)
    return <p> No notification </p>;
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Container>
        <TitleH2 title="Notifications" />
      </Container>
      <div className="flex">
        <button
          type="button"
          value=""
          className={cn('px-3 py-4 h-full border-b-4')}
          onClick={handleClickFilters}
        >
          All <span className="bg-grey-light py-1 px-1 rounded-md">10</span>
        </button>
        <button
          type="button"
          value="event"
          className="px-3"
          onClick={handleClickFilters}
        >
          Events <span className="bg-grey-light py-1 px-1 rounded-md">5</span>
        </button>
        <button
          type="button"
          value="friend"
          className="px-3"
          onClick={handleClickFilters}
        >
          Friends <span className="bg-grey-light py-1 px-1 rounded-md">3</span>
        </button>
      </div>
      <Container className="flex-grow px-1.5">
        {notifications &&
          notifications
            .filter((notification) => {
              if (activeFilter === '') return true;
              return notification.type === activeFilter;
            })
            .map((notification) => <DispatchNotifications {...notification} />)}
      </Container>
    </div>
  );
}

export default NotificationContainer;
