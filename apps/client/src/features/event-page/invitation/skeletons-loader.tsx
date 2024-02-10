/* eslint-disable-next-line*/
import FriendCardSkeleton from '../../../shared/components/friend-card/skeleton';

type SkeletonsLoaderProps = {
  nbSkeleton: number;
};

function SkeletonsLoader({ nbSkeleton }: SkeletonsLoaderProps) {
  const skeletons = Array(nbSkeleton).fill(0);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      {skeletons.map((_, index) => (
        <FriendCardSkeleton key={index} />
      ))}
    </div>
  );
}

export default SkeletonsLoader;
