import { useNavigate, useParams } from 'react-router-dom';
import { useGetConfirmedFriends } from '../../../hooks/useFriends';
import { ArrowLeft } from 'lucide-react';
import Container from '../../../layouts/container';
import SearchInput from '../../../components/search-input';
/*eslint-disable*/
import { useState } from 'react';
import NewConversationOneToOne from './index.one-to-one';
import NewConversationGroup from './index.group';
/*eslint-enable*/

function NewConversation() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [typeConversation, setTypeConversation] = useState<
    'group' | 'oneToOne'
  >('oneToOne');
  const { data: friends } = useGetConfirmedFriends({
    profileId: Number(userId),
  });

  return (
    <Container className="flex-grow p-0">
      <div className="flex items-center gap-x-4 px-4 py-4">
        <div
          className="flex aspect-square cursor-pointer items-center
          justify-center rounded-full border border-opacity-10 p-1.5 
         text-primary-700 shadow"
          onClick={() => {
            typeConversation === 'oneToOne'
              ? navigate(-1)
              : setTypeConversation('oneToOne');
          }}
        >
          <ArrowLeft size={18} />
        </div>
        <h2 className="text-md font-semibold">
          {typeConversation === 'oneToOne'
            ? 'New discussion'
            : 'New group discussion'}
        </h2>
      </div>
      <div className="my-2 px-4">
        <SearchInput />
      </div>
      {typeConversation === 'oneToOne' && friends && (
        <NewConversationOneToOne
          friends={friends}
          userId={Number(userId)}
          setTypeConversation={setTypeConversation}
        />
      )}
      {typeConversation === 'group' && friends && (
        <NewConversationGroup friends={friends} userId={Number(userId)} />
      )}
    </Container>
  );
}

export default NewConversation;
