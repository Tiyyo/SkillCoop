function FriendCardSkeleton() {
  return (
    <div className="flex animate-pulse py-2 px-3 gap-3 items-center ">
      <div className="flex-shrink-0">
        <span className="w-10 h-10 block bg-gray-200 rounded-full dark:bg-gray-700"></span>
      </div>

      <div className="flex flex-col w-full gap-2 justify-between">
        <ul className="mt-5 space-y-3">
          <li className="w-full h-4 bg-gray-200 rounded-md dark:bg-gray-700"></li>
        </ul>
        <h3 className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-2/5"></h3>
      </div>
    </div>
  );
}

export default FriendCardSkeleton;
