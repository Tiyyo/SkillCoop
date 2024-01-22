import FriendCardSkeleton from '../friend-card/skeleton';

function SkeletonFallback({ NB_SKELETON = 14 }) {
  return (
    <div className="relative grid grid-cols-2 py-8 gap-2 bg-base-light z-10">
      {[...Array(NB_SKELETON)].map((_, i) => (
        <FriendCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default SkeletonFallback;
