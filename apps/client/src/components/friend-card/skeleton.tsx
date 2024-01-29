function FriendCardSkeleton() {
  return (
    <div className="relative">
      <div
        className="absolute z-10 h-full 
        w-full animate-opacity-in bg-base-light"
      ></div>
      <div
        className="relative z-0 flex animate-pulse items-center 
        gap-3 px-3 py-2"
      >
        <div className="flex-shrink-0">
          <span className="block h-10 w-10 rounded-full bg-gray-200"></span>
        </div>

        <div className="flex w-full flex-col justify-between gap-2">
          <ul className="mt-5 space-y-3">
            <li className="h-4 w-full rounded-md bg-gray-200 "></li>
          </ul>
          <h3 className="h-4 w-2/5 rounded-md bg-gray-200"></h3>
        </div>
      </div>
    </div>
  );
}

export default FriendCardSkeleton;
