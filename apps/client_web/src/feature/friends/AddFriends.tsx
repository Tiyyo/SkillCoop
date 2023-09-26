import Return from "../../assets/icon/Return";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../component/search-input";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchProfileFn } from "../../api/authApi";
import { SearchProfileQuery } from "../../types";
import { useStateContext } from "../../context/app.context";
import ProfileCard from "../../component/friend-card/profile";
import { useFriends } from "../../store/friendStore";

function AddFriends() {
  const stateContext = useStateContext();
  const profildId = stateContext?.state?.userProfile.profile_id
  const {addSearchProfile, searchProfiles} = useFriends()
  const [searchValue, setSearchValue] = useState<SearchProfileQuery>({
    username: "",
    page: 1,
    userProfileId:profildId ,
  });
  const navigate = useNavigate();
  const {
    data: profiles,
    refetch: refetchProfiles,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["searchProfile"],
    queryFn: ({ signal }) => searchProfileFn(searchValue , signal),
    enabled: false,
  });

  const loading = isLoading || isFetching;

  const handleClickReturn = () => {
    navigate("/contact");
  };

  const getInputSearchValue = (value: string) => {
    setSearchValue({...searchValue, username : value});
  };

  useEffect(() => {
    refetchProfiles();
}, [searchValue])

useEffect(() => {
  if(!profiles) return
  addSearchProfile(profiles)
},[profiles])


  return (
    <>
      <button onClick={handleClickReturn} className="py-2 px-3 text-light">
        <Return />
      </button>
      <h2 className="text-md px-4 py-2 font-bold text-primary-1000">
        Add new contact to your friendlist
      </h2>
      <div className="px-4 py-2">
        <SearchInput onChange={getInputSearchValue} />
      </div>
      <div className="grid grid-cols-2 py-8 gap-2">
      {searchProfiles?.map((profile) => (
        <ProfileCard 
            avatar={profile.avatar_url}
            username={profile.username}
            friendId={profile.profile_id}
            relation={profile.relation_exists}
            profileId={profildId}
            refetch={refetchProfiles}
        />
        ))}
      </div>
    </>
  );
}

export default AddFriends;
