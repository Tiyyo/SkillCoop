import { UserPlus2Icon } from 'lucide-react';
import React from 'react';
import { Friend } from '@skillcoop/types/src';
import { useTranslation } from 'react-i18next';
import useNewOneToOneConversation from '../hooks/useNewOneToOneConversation';
import AddNewConversationOneToOneFriends from './one-to-one.friends';

type NewConversationOneToOneProps = {
  friends: Friend[];
  userId: string | undefined;
  searchInputValue?: string;
  setTypeConversation: React.Dispatch<
    React.SetStateAction<'group' | 'oneToOne'>
  >;
};

function NewConversationOneToOne({
  friends,
  userId,
  setTypeConversation,
  searchInputValue,
}: NewConversationOneToOneProps) {
  const { t } = useTranslation('chat');
  const { navigateToConversation } = useNewOneToOneConversation({ userId });

  return (
    <>
      <div
        className="flex cursor-pointer items-center justify-end pb-2 pt-4 
        text-sm font-medium text-primary-1000 text-opacity-70"
      >
        <UserPlus2Icon />
        <button
          type="button"
          className="px-4"
          onClick={() => setTypeConversation('group')}
        >
          {t('newGroupDiscussion')}
        </button>
      </div>
      <div
        className="no-scrollbar flex h-50vh w-full flex-col 
        content-start overflow-y-auto px-2 py-6 lg:gap-3 xl:grid 
        xl:grid-cols-2 2xl:grid-cols-3"
      >
        <AddNewConversationOneToOneFriends
          friends={friends}
          navigateToConversation={navigateToConversation}
          searchInputValue={searchInputValue}
        />
      </div>
    </>
  );
}

export default NewConversationOneToOne;
