import { useEffect } from 'react';
import { useFriends } from '../store/friend.store';
import { useGetConfirmedFriends } from './useFriends';

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
