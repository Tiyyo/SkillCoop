import FriendCardSkeleton from '../friend-card/skeleton';

function SkeletonFallback({ NB_SKELETON = 14 }) {
  return (
    <div className="relative z-10 grid grid-cols-2 gap-2 bg-base-light py-8">
      {[...Array(NB_SKELETON)].map((_, i) => (
        <FriendCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default SkeletonFallback;
