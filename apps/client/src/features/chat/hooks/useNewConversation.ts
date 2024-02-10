import { useParams } from 'react-router-dom';
import { useGetConfirmedFriends } from '../../../hooks/useFriends';
import { useState } from 'react';

export default function useNewConversation() {
  const { userId } = useParams();
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

  return {
    getSearchInputValue,
    searchInputValue,
    friends,
    typeConversation,
    setTypeConversation,
  };
}
