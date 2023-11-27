import { Link } from 'react-router-dom';
import Friendlist from './list.friends';
import TitleH2 from '../../component/title-h2';
import { useApp } from '../../store/app.store';
import { useConfirmedfriends } from '../../hooks/useConfirmedFriends';
import SubHeader from '../../component/header/sub-header';

function ConfirmedFriends() {
  // TODO implement infinite scroll
  const { userProfile } = useApp();
  const profileId = userProfile?.profile_id;
  const { confirmedFriends, loading, isError } = useConfirmedfriends({
    profileId,
  });

  return (
    <>
      <SubHeader
        title="My friends"
        isPlusExist={true}
        linkFromPlus="add"
        textButton="Add New Friend"
        legend="Here is the list of your friends. 
        You can see their profile by clicking on their avatar."
      />
      <Link
        to="pending-request"
        className="text-end px-3 text-xs py-2 text-primary-900 
          underline-offset-4 underline transition-all duration-300 
          hover:text-primary-1100 cursor-pointer"
      >
        See pending request
      </Link>
      <Friendlist
        loading={loading}
        friends={confirmedFriends}
        error={isError}
        activeLinkProfile
      />
    </>
  );
}

export default ConfirmedFriends;
