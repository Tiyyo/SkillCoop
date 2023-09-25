import { useQuery } from "@tanstack/react-query";
import { getFriendsFn, searchFriendsFn } from "../../api/authApi";
import { useStateContext } from "../../context/app.context";
import SearchInput from "../../component/search-input";
import FriendCard from "../../component/friend-card";
import Return from "../../assets/icon/Return";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function InvitationEvent() {
  const stateContext = useStateContext();
  const profileId = stateContext?.state.userProfile.profile_id;
  const [isOnFocus, setIsOnFocus] = useState<boolean>(false);
  const [ searchFriendQuery , setSearchFriendQuery ] = useState({
    username : "",
    profile : profileId,
    page : 1,
})
console.log(searchFriendQuery);
console.log(isOnFocus);
  const navigate = useNavigate();
  const handleClickReturn = () => {
    navigate("/new-event");
  };
  const {
    data: friends,
    isError,
    isLoading,
    isFetching,
  } = useQuery(["getFriends"], () => getFriendsFn(profileId), {
    enabled: true,
  });

  const {
    data : searchedFriends,
    refetch : refetchSearchFriends,
    isError : isSearchError,
    isLoading : isSearchLoading,
    isFetching : isSearchFetching,  
} = useQuery({
  queryKey : ["searchFriends"],
  queryFn : ({signal}) => searchFriendsFn(searchFriendQuery, signal),
  enabled : false,
} 
)

const getFocusInputSearchState = (state : boolean) => {
  setIsOnFocus(state);
}

const getSearchValue = (value : string) => {
  setSearchFriendQuery({
    ...searchFriendQuery,
    username : value
  })
}

useEffect(() => {
    refetchSearchFriends()
} , [searchFriendQuery])
  return (
    <>
      <button onClick={handleClickReturn} className="py-2 px-3 text-light">
        <Return />
      </button>
      <div className="px-4">
        <h2 className="text-lg text-center py-2 font-bold text-primary-1000">
          Invite your friends
        </h2>
        <SearchInput getFocusState={getFocusInputSearchState} onChange={getSearchValue}/>
        {isOnFocus ? (
          <div className="grid grid-cols-2 py-8 gap-2">
            {searchedFriends?.map((friend) => (
              <FriendCard
                avatar={friend.avatar_url}
                username={friend.username}
                adderId={friend.adder_id}
                friendId={friend.friend_id}
                status={friend.status_name}
                activeSelected
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 py-8 gap-2">
            {friends?.map((friend) => (
              <FriendCard
                avatar={friend.avatar_url}
                username={friend.username}
                adderId={friend.adder_id}
                friendId={friend.friend_id}
                status={friend.status_name}
                activeSelected
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default InvitationEvent;
