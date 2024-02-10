import { useNavigate, useParams } from 'react-router-dom';
import Container from '../../../shared/layouts/container';
import SearchInput from '../../../components/search-input';

import NewConversationOneToOne from './one-to-one';

import NewConversationGroup from './group';
import useNewConversation from '../hooks/useNewConversation';
import AddConversationTitle from './title';
import ReturnArrowBtn from '../../../shared/components/return-arrow-btn';

function NewConversation() {
  const {
    getSearchInputValue,
    friends,
    typeConversation,
    setTypeConversation,
    searchInputValue,
  } = useNewConversation();
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleClickReturn = (condition: string): void => {
    condition === 'oneToOne' ? navigate(-1) : setTypeConversation('oneToOne');
  };

  return (
    <Container className="flex-grow p-0 lg:relative lg:rounded-none">
      <div className="flex items-center gap-x-4 px-4 py-4">
        <ReturnArrowBtn
          onClick={handleClickReturn}
          condition={typeConversation}
        />
        <AddConversationTitle typeConversation={typeConversation} />
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
