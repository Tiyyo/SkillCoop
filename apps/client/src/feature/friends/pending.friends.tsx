import { useQuery } from '@tanstack/react-query';
import { getPendingFriendsFn } from '../../api/api.fn';
import Friendlist from './list.friends';
import { useFriends } from '../../store/friend.store';
import { useEffect } from 'react';
import ReturnBtn from '../../component/return';
import TitleH2 from '../../component/title-h2';
import { useApp } from '../../store/app.store';

function PendingFriends() {
  const { userProfile } = useApp();
  const { addPendingFriend, pendingFriends } = useFriends();
  const profileId = userProfile?.profile_id;
  const {
    data: friends,
    isLoading,
    isFetching,
    isError,
  } = useQuery(
    ['getPendingFriends'],
    () => {
      if (!profileId) return;
      return getPendingFriendsFn(profileId);
    },
    {
      enabled: true,
    }
  );
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
        stringKey="adder_id"
        activeLinkProfile={false}
      />
    </>
  );
}

export default PendingFriends;
