import { useQuery } from '@tanstack/react-query';
import { getPendingFriendsFn } from '../../api/authApi';
import { useStateContext } from '../../context/app.context';
import Friendlist from './Friendslist';
import { useFriends } from '../../store/friendStore';
import { useEffect } from 'react';
import ReturnBtn from '../../component/return';
import TitleH2 from '../../component/title-h2';

function PendingFriends() {
  const stateContext = useStateContext();
  const { addPendingFriend, pendingFriends } = useFriends();
  const profileId = stateContext?.state?.userProfile.profile_id;
  const {
    data: friends,
    isLoading,
    isFetching,
    isError,
  } = useQuery(['getPendingFriends'], () => getPendingFriendsFn(profileId), {
    enabled: true,
  });
  const loading = isLoading || isFetching;

  useEffect(() => {
    if (!friends) return;
    addPendingFriend(friends);
  }, [friends]);

  return (
    <>
      <ReturnBtn to="/contact" />
      <TitleH2 value="Pending request" />
      <Friendlist
        loading={loading}
        friends={pendingFriends}
        error={isError}
      />
    </>
  );
}

export default PendingFriends;
