function ConversationInfos() {
  return (
    <div className="mx-auto max-w-md flex-grow rounded-lg bg-white p-4 shadow">
      <div className="flex flex-col items-center">
        <img
          src="https://picsum.photos/200/300"
          alt="group picture"
          className="h-32 w-32 rounded-full object-cover shadow-lg"
        />
        <h1 className="mt-3 text-xl font-semibold text-gray-800">Group Name</h1>
        {/* Replace with conditional rendering based on conversation type */}
        <p
          className="mt-1 cursor-pointer text-sm text-blue-600 
        hover:text-blue-800"
        >
          Link to friend profile
        </p>
      </div>

      {/* if group chat or event chat */}
      <ul className="mt-4 space-y-3">
        {/* List of members */}
        <li className="flex items-center space-x-3">
          <img
            src={'link to image friend'}
            className="h-8 w-8 rounded-full object-cover"
          />
          <span className="text-sm text-gray-700">Friend username</span>
        </li>
        {/* ... other list items */}
      </ul>

      <div className="mt-5 space-y-2">
        <button
          className="w-full rounded bg-blue-400 px-4 py-2 text-sm
     text-white transition duration-300 hover:bg-blue-500"
        >
          Change Group Name
        </button>
        <button className="w-full rounded bg-gray-300 px-4 py-2 text-sm text-gray-700 transition duration-300 hover:bg-gray-400">
          Invite Members
        </button>
        <button className="w-full rounded bg-gray-500 px-4 py-2 text-sm text-white transition duration-300 hover:bg-gray-600">
          Leave Group
        </button>
        <button className="w-full rounded bg-gray-700 px-4 py-2 text-sm text-white transition duration-300 hover:bg-gray-800">
          Delete Discussion
        </button>
      </div>
    </div>
  );
}

export default ConversationInfos;
