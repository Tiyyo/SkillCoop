import { useInfiniteQuery } from '@tanstack/react-query';

interface IUseInfinite {
  queryKey: string | string[];
  elementPerPage: number;
  queryFn: any;
  argsFn: Record<string, any>;
}

function useInfinite({
  queryKey,
  queryFn,
  argsFn,
  elementPerPage,
}: IUseInfinite) {
  const { data, isError, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: ({ pageParam = 1 }) => {
        if (!argsFn) return;
        return queryFn({ ...argsFn, page: pageParam });
      },
      getNextPageParam: (lastPage) => {
        if (
          lastPage &&
          lastPage.eventCount > lastPage.previousPage * elementPerPage
        ) {
          return lastPage.previousPage + 1;
        }
      },
    });
  const loading = isLoading || isFetching;
  return { data, isError, loading, hasNextPage, fetchNextPage };
}

export default useInfinite;