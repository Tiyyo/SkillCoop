import { useEffect } from 'react';
import { useGetSuggestProfile } from './useProfile';
import { useFriends } from '../stores/friend.store';

export function useSuggestProfile({ profileId }: { profileId?: number }) {
  const { addSearchProfile } = useFriends();
  const { data } = useGetSuggestProfile({ profileId });

  useEffect(() => {
    if (data) {
      addSearchProfile(data);
    }
  }, [data]);
}
