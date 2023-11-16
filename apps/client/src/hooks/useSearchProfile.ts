import { useEffect, useState } from 'react';
import { SearchProfileQuery } from '../types';
import { useGetSearchProfile } from './useProfile';
import { useFriends } from '../store/friend.store';

export function useSearchProfile({ profileId }: { profileId?: number }) {
  const { addSearchProfile } = useFriends();
  const [searchValue, setSearchValue] = useState<SearchProfileQuery>({
    username: '',
    page: 1,
    userProfileId: profileId ?? 0,
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
