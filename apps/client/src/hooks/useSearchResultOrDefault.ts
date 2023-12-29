import { useEffect, useState } from 'react';
import type { SearchFriendQuery } from 'skillcoop-types';
import { useGetConfirmedFriends, useSearchInFriendlist } from './useFriends';

type UseSearchResultOrDefault = {
  profileId?: number;
};

export function useSearchResultOrDefault({
  profileId,
}: UseSearchResultOrDefault) {
  const [searchFriendQuery, setSearchFriendQuery] = useState<SearchFriendQuery>(
    {
      username: '',
      profile: profileId ? profileId : 0,
      page: 1,
    },
  );
  const {
    data: friends,
    isLoading,
    isFetching,
  } = useGetConfirmedFriends({ profileId: profileId });

  const {
    data: searchedFriends,
    refetch,
    isLoading: isSearchLoading,
    isFetching: isSearchFetching,
  } = useSearchInFriendlist(searchFriendQuery);

  const getSearchValue = (value: string) => {
    setSearchFriendQuery({
      ...searchFriendQuery,
      username: value,
    });
  };

  const loading =
    isLoading || isFetching || isSearchLoading || isSearchFetching;

  useEffect(() => {
    refetch();
  }, [searchFriendQuery]);

  return {
    getSearchValue,
    data: searchFriendQuery.username ? searchedFriends : friends,
    loading,
  };
}
