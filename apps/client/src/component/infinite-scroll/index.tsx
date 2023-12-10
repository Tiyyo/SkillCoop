import { useEffect, useRef } from 'react';
import Spinner from '../loading';

type InfiniteScrollProps = {
  children: React.ReactNode;
  loading: boolean;
  triggerNextPage?: () => void;
  hasMore: boolean;
};

function InfiniteScroll({
  children,
  loading,
  triggerNextPage,
  hasMore,
}: InfiniteScrollProps) {
  const bottomDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ref = bottomDivRef.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting === true && !hasMore) {
        triggerNextPage && triggerNextPage();
      }
    });
    if (ref) {
      observer.observe(bottomDivRef.current);
    }
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, []);

  return (
    <div className="flex flex-col w-full justify-center items-center">
      {children}
      <div ref={bottomDivRef} />
      {loading && (
        <div className="py-5">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default InfiniteScroll;
