import { useEffect } from 'react';
import { useFriends } from '../store/friend.store';
import { useGetPendingFriendsRequest } from './useFriends';

export function usePendingFriends({ profileId }: { profileId?: number }) {
  const { addPendingFriend, pendingFriends } = useFriends();
  const { data, isLoading, isFetching, isError } = useGetPendingFriendsRequest({
    profileId,
  });

  // add to fetch pending to store
  useEffect(() => {
    if (!data) return;
    addPendingFriend(data);
  }, [data]);

  const loading = isLoading || isFetching;
  return { pendingFriends, loading, isError };
}
