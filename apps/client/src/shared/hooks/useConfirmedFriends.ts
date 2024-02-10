import { useEffect } from 'react';
import { useFriends } from '../../features/friends/store/friend.store';
import { useGetConfirmedFriends } from '../../hooks/useFriends';

export function useConfirmedfriends({ profileId }: { profileId?: number }) {
  const { addConfirmedFriends, confirmedFriends } = useFriends();
  const { data, isLoading, isFetching, isError } = useGetConfirmedFriends({
    profileId,
  });

  const loading = isLoading || isFetching;

  // add fetch friends to store
  useEffect(() => {
    if (!data) return;
    addConfirmedFriends(data);
  }, [data]);

  return { confirmedFriends, loading, isError };
}
