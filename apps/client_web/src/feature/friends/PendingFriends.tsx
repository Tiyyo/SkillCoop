import { useQuery } from "@tanstack/react-query";
import { getPendingFriendsFn } from "../../api/authApi";
import { useStateContext } from "../../context/app.context";
import Return from "../../assets/icon/Return";
import { useNavigate } from "react-router-dom";
import Friendlist from "./Friendslist";
import { useFriends } from "../../store/friendStore";
import { useEffect } from "react";

function PendingFriends() {
  const stateContext = useStateContext();
  const {addPendingFriend, pendingFriends} = useFriends()
  const navigate = useNavigate();
  const profileId = stateContext?.state?.userProfile.profile_id;
  const {
    data: friends,
    isLoading,
    isFetching,
    isError,
  } = useQuery(["getPendingFriends"], () => getPendingFriendsFn(profileId), {
    enabled: true,
  });
  const loading = isLoading || isFetching;

  const handleClickReturn = () => {
    navigate("/contact");
  }

  useEffect(() =>{
  if(!friends) return
  addPendingFriend(friends)
  }, [friends])

  return (
    <>
      <button onClick={handleClickReturn} className="py-2 px-3 text-light">
        <Return />
      </button>
      <h2 className="text-md px-4 py-2 font-bold text-primary-1000">
        Pending request
      </h2>
      <Friendlist loading={loading} friends={pendingFriends} error={isError} />
    </>
  );
}

export default PendingFriends;
