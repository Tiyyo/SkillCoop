import { ArrowRight } from 'lucide-react';
import { Friend } from '@skillcoop/types/src';
/*eslint-disable*/
import { useTranslation } from 'react-i18next';
import HorizontalAvatarList from '../../../shared/components/horizontal-avatar-list';
import useNewGroupConversation from '../hooks/useNewGroupConversation';
import AddNewGroupConversationFriends from './group.friends';
/*eslint-enable*/

type NewConversationGroupProps = {
  friends: Friend[];
  userId: string | undefined;
  searchInputValue?: string;
};

function NewConversationGroup({
  friends,
  userId,
  searchInputValue,
}: NewConversationGroupProps) {
  const { t } = useTranslation('chat');
  const {
    friendsToAdd,
    removeFriends,
    handleChangeTitile,
    handleClickCreateConversation,
  } = useNewGroupConversation({ userId });

  return (
    <>
      <div
        className="no-scrollbar flex w-full gap-x-4 overflow-x-auto 
          px-6 py-3"
      >
        <HorizontalAvatarList remove={removeFriends} friends={friendsToAdd} />
      </div>
      <div className="flex flex-col overflow-y-auto pb-20 pt-6">
        <input
          type="text"
          placeholder={t('optionalGroupName')}
          name="title"
          className="mx-auto mb-4 w-2/3 max-w-lg rounded-xl bg-grey-off 
        px-3 py-1.5 text-sm placeholder:px-3 placeholder:text-xs"
          onChange={handleChangeTitile}
        />
        <div
          className="no-scrollbar flex flex-col content-start 
          overflow-y-auto px-2 py-6 lg:gap-3 xl:grid xl:grid-cols-2 
          2xl:grid-cols-3"
        >
          <AddNewGroupConversationFriends
            friends={friends}
            searchInputValue={searchInputValue}
          />
        </div>
        <div
          className="fixed bottom-4 right-4 z-10 flex h-10
        w-10 cursor-pointer items-center justify-center rounded-full 
      bg-primary-900 text-white lg:absolute"
          onClick={handleClickCreateConversation}
        >
          <ArrowRight size={24} />
        </div>
      </div>
    </>
  );
}

export default NewConversationGroup;
