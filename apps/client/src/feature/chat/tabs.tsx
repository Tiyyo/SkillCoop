import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';
import { useTranslation } from 'react-i18next';

type ConversationFilter = 'all' | 'event' | 'group' | 'personal';

type FilterBtnProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  activeFilter: ConversationFilter;
  tabName: ConversationFilter;
};

function Tab({ onClick, activeFilter, tabName }: FilterBtnProps) {
  const { t } = useTranslation('notification');
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (activeFilter === tabName) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [activeFilter]);

  return (
    <div className="flex items-center">
      <button
        type="button"
        value={tabName}
        className={cn(
          'text-xs px-3 py-2.5 h-full border-l-4 border-l-transparent ',
          isActive && ' border-l-primary-800',
        )}
        onClick={onClick}
      >
        {t(tabName)}
      </button>
    </div>
  );
}

function Tabs({
  getClickValue,
  currentFilter,
}: {
  getClickValue: (valueFilter: ConversationFilter) => void;
  currentFilter: ConversationFilter;
}) {
  const conversationTypes = ['all', 'personal', 'group', 'event'] as const;

  const handleClickFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    getClickValue(value as ConversationFilter);
  };
  return (
    <div className="flex">
      {conversationTypes.length > 0 &&
        conversationTypes.map((type, index) => (
          <Tab
            key={index}
            onClick={handleClickFilters}
            activeFilter={currentFilter}
            tabName={type}
          />
        ))}
    </div>
  );
}

export default Tabs;
