import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import capitalize from '../../utils/capitalize';
import { NotificationFilters, notificationFilters } from '../../types';
import { useNotifications } from '../../store/notification.store';

interface FilterBtnProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  activeFilter: NotificationFilters;
  componentFilter: NotificationFilters;
  unread: number | string | null;
}

function FilterBtn({
  onClick,
  activeFilter,
  componentFilter,
  unread,
}: FilterBtnProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (activeFilter === componentFilter) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [activeFilter]);

  return (
    <div className="flex items-center">
      <button
        type="button"
        value={componentFilter}
        className={cn(
          'text-xs pl-3 py-2.5 h-full border-l-4 border-l-transparent ',
          isActive && ' border-l-primary-700',
          Number(unread) > 0 ? '' : 'pr-3',
        )}
        onClick={onClick}
      >
        {capitalize(componentFilter)}
      </button>
      {Number(unread) > 0 && (
        <span
          className="self-start py-0.5 px-1 rounded-sm mx-1.5 text-xxs
         text-white bg-error-mid"
        >
          {unread}
        </span>
      )}
    </div>
  );
}

function NotificationFilters() {
  const { setActiveFilter, activeFilter } = useNotifications();
  const {
    allUnreadNotifications,
    eventUnreadNotifications,
    friendUnreadNotifications,
  } = useNotifications();
  const filters = [
    { key: notificationFilters.all, unread: allUnreadNotifications },
    {
      key: notificationFilters.event,
      unread: eventUnreadNotifications,
    },
    { key: notificationFilters.friend, unread: friendUnreadNotifications },
  ];
  const handleClickFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    setActiveFilter(value as NotificationFilters);
  };
  return (
    <div className="flex">
      {filters.length > 0 &&
        filters.map((filter) => (
          <FilterBtn
            key={filter.key}
            onClick={handleClickFilters}
            activeFilter={activeFilter}
            componentFilter={filter.key}
            unread={filter.unread ?? null}
          />
        ))}
    </div>
  );
}

export default NotificationFilters;
