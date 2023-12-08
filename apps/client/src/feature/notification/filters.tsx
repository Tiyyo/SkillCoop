import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import capitalize from '../../utils/capitalize';
import { NotificationFilters, notificationFilters } from '../../types';
import { useNotifications } from '../../store/notification.store';

interface FilterBtnProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  activeFilter: NotificationFilters;
  componentFilter: NotificationFilters;
}

function FilterBtn({ onClick, activeFilter, componentFilter }: FilterBtnProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (activeFilter === componentFilter) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [activeFilter]);

  return (
    <button
      type="button"
      value={componentFilter}
      className={cn(
        'text-xs px-3 py-2.5 h-full ',
        isActive && 'border-l-4 border-l-primary-700',
      )}
      onClick={onClick}
    >
      {capitalize(componentFilter)}
      <span className="bg-grey-light py-1 px-1 rounded-md mx-1.5">10</span>
    </button>
  );
}

function NotificationFilters() {
  const { setActiveFilter, activeFilter } = useNotifications();
  const filters = [
    notificationFilters.all,
    notificationFilters.event,
    notificationFilters.friend,
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
            onClick={handleClickFilters}
            activeFilter={activeFilter}
            componentFilter={filter}
          />
        ))}
    </div>
  );
}

export default NotificationFilters;
