import { useNavigate, useParams } from 'react-router-dom';
import { useGetConfirmedFriends } from '../../../../hooks/useFriends';
import { ArrowLeft } from 'lucide-react';
import Container from '../../../../layouts/container';
import SearchInput from '../../../../components/search-input';

import { useState } from 'react';
import NewConversationOneToOne from './index.one-to-one';
import NewConversationGroup from './index.group';
import { useTranslation } from 'react-i18next';

function NewConversation() {
  const { t } = useTranslation('chat');
  const { userId } = useParams();
  const navigate = useNavigate();
  const [searchInputValue, setSearchInputValue] = useState('');
  const [typeConversation, setTypeConversation] = useState<
    'group' | 'oneToOne'
  >('oneToOne');
  const { data: friends } = useGetConfirmedFriends({
    profileId: Number(userId),
  });

  const getSearchInputValue = (value: string) => {
    setSearchInputValue(value);
  };

  return (
    <Container className="flex-grow p-0 lg:relative lg:rounded-none">
      <div className="flex items-center gap-x-4 px-4 py-4">
        <div
          className="flex aspect-square cursor-pointer items-center 
          justify-center rounded-full border border-border border-opacity-10 
          p-1.5 text-primary-800 shadow"
          onClick={() => {
            typeConversation === 'oneToOne'
              ? navigate(-1)
              : setTypeConversation('oneToOne');
          }}
        >
          <ArrowLeft size={18} />
        </div>
        <h2 className="text-md font-semibold">
          {typeConversation === 'oneToOne' ? (
            <>{t('newDiscussion')}</>
          ) : (
            <>{t('newGroupDiscussion')}</>
          )}
        </h2>
      </div>
      <div className="my-2 px-4">
        <SearchInput onChange={getSearchInputValue} />
      </div>
      {typeConversation === 'oneToOne' && friends && (
        <NewConversationOneToOne
          friends={friends}
          userId={Number(userId)}
          setTypeConversation={setTypeConversation}
          searchInputValue={searchInputValue}
        />
      )}
      {typeConversation === 'group' && friends && (
        <NewConversationGroup
          friends={friends}
          userId={Number(userId)}
          searchInputValue={searchInputValue}
        />
      )}
    </Container>
  );
}

export default NewConversation;
