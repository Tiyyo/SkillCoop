import { useEffect, useState } from 'react';
import type { SearchProfileQuery } from '@skillcoop/types/src';
import { useGetSearchProfile } from '../../../shared/hooks/useProfile';
import { useFriends } from '../store/friend.store';

export function useSearchProfile({ profileId }: { profileId?: string }) {
  const { addSearchProfile } = useFriends();
  const [searchValue, setSearchValue] = useState<SearchProfileQuery>({
    username: '',
    page: 1,
    userProfileId: profileId ?? '',
  });

  const { data, refetch } = useGetSearchProfile(searchValue);

  const getInputSearchValue = (value: string) => {
    setSearchValue({ ...searchValue, username: value });
  };

  useEffect(() => {
    if (!data) return;
    addSearchProfile(data);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [searchValue.username]);

  return { data, getInputSearchValue };
}
