import { Link } from 'react-router-dom';
import Friendlist from './list.friends';
import TitleH2 from '../../component/title-h2';
import { useApp } from '../../store/app.store';
import { useConfirmedfriends } from '../../hooks/useConfirmedFriends';
import SubHeader from '../../component/header/sub-header';
import Container from '../../layout/container';
import { ArrowRight } from 'lucide-react';

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
      <Container className="h-full">
        <div className="flex justify-between items-center">
          <TitleH2 />
          <Link
            to="pending-request"
            className="flex items-center gap-x-1 text-end px-3 text-xs py-2 text-primary-100
           transition-all duration-300 font-medium
          hover:text-dark cursor-pointer"
          >
            View pending request
            <ArrowRight size={16} />
          </Link>
        </div>
        <Friendlist
          loading={loading}
          friends={confirmedFriends}
          error={isError}
          activeLinkProfile
        />
      </Container>
    </>
  );
}

export default ConfirmedFriends;
