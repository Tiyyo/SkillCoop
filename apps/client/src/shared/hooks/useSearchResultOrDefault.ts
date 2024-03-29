import { useEffect, useState } from 'react';
import type { SearchFriendQuery } from '@skillcoop/types/src';
import {
  useGetConfirmedFriends,
  useSearchInFriendlist,
} from '../../features/friends/hooks/useFriends';

type UseSearchResultOrDefault = {
  profileId?: string;
};

export function useSearchResultOrDefault({
  profileId,
}: UseSearchResultOrDefault) {
  const [searchFriendQuery, setSearchFriendQuery] = useState<SearchFriendQuery>(
    {
      username: '',
      profile: profileId ? profileId : '',
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
