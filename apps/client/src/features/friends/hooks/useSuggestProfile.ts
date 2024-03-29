import { useEffect } from 'react';
import { useGetSuggestProfile } from '../../../shared/hooks/useProfile';
import { useFriends } from '../store/friend.store';

export function useSuggestProfile({ profileId }: { profileId?: string }) {
  const { addSearchProfile } = useFriends();
  const { data } = useGetSuggestProfile({ profileId });

  useEffect(() => {
    if (data) {
      addSearchProfile(data);
    }
  }, [data]);
}
