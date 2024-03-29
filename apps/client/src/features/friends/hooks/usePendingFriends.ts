import { useEffect } from 'react';
import { useFriends } from '../store/friend.store';
import { useGetPendingFriendsRequest } from './useFriends';

export function usePendingFriends({ profileId }: { profileId?: string }) {
  const { addPendingFriend, pendingFriends } = useFriends();
  const { data, isLoading, isFetching, isError } = useGetPendingFriendsRequest({
    profileId,
  });

  // add fetch pending to store
  useEffect(() => {
    if (!data) return;
    addPendingFriend(data);
  }, [data]);

  const loading = isLoading || isFetching;
  return { pendingFriends, loading, isError };
}
