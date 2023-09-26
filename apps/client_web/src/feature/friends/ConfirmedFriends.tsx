import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getFriendsFn } from "../../api/authApi";
import { useStateContext } from "../../context/app.context";
import Friendlist from "./Friendslist";
import { useFriends } from "../../store/friendStore";
import { useEffect } from "react";

function ConfirmedFriends() {
  // TODO implement infinite scroll
  const stateContext = useStateContext();
  const {addConfirmedFriends, confirmedFriends} = useFriends()
  const profileId = stateContext?.state?.userProfile.profile_id;
  const {
    data: friends,
    isLoading,
    isFetching,
    isError,
  } = useQuery(["getFriends"], () => getFriendsFn(profileId), {
    enabled: true,
  });
  const loading = isLoading || isFetching;

  useEffect(() =>{
  if(!friends) return
  addConfirmedFriends(friends)
  }, [friends])

  return (
    <>
      <Link
        to="pending-request"
        className="text-end px-3 text-xs py-2 text-primary-900 underline-offset-4 underline transition-all duration-300 hover:text-primary-1100 cursor-pointer
"
      >
        See pending request
      </Link>
      <h2 className="text-md px-4 py-2 font-bold text-primary-1000">
        My friends
      </h2>
      <Friendlist loading={loading} friends={confirmedFriends} error={isError} />
    </>
  );
}

export default ConfirmedFriends;
