import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getFriendsFn,
  searchFriendsFn,
  sendEventInvitationFn,
} from '../../api/authApi';
import SearchInput from '../search-input';
import { useEffect, useState } from 'react';
import { useApp } from '../../store/app.store';
import { SearchFriendQuery } from '../../types';
import ReturnBtn from '../return';
import TitleH2 from '../title-h2';
import Button from '../button';
import { useEvent } from '../../store/event.store';
import SwitchMutateOrUpdate from './index.switch';
import { useLocation, useNavigate } from 'react-router-dom';
import schema from 'schema';
import toast from '../../utils/toast';
const { inviteParticipantSchema } = schema;

interface InviteProps {
  variant: 'mutate' | 'update';
}

// One component gonna update a state in store and will manage the mutation
// The other gonna mutate data directyl without storing data in a store
function Invite({ variant = 'update' }: InviteProps) {
  const { userProfile } = useApp();
  const { data: eventState } = useEvent();
  const location = useLocation();
  const navigate = useNavigate();
  const profileId = userProfile?.profile_id;
  const [isOnFocus, setIsOnFocus] = useState<boolean>(false);

  const [searchFriendQuery, setSearchFriendQuery] = useState<SearchFriendQuery>(
    {
      username: '',
      profile: profileId ? profileId : 0,
      page: 1,
    }
  );

  const {
    data: friends,
    isLoading,
    isFetching,
  } = useQuery(
    ['getFriends'],
    () => {
      if (!profileId) return;
      return getFriendsFn(profileId);
    },
    {
      enabled: true,
    }
  );

  const {
    data: searchedFriends,
    refetch: refetchSearchFriends,
    isError: isSearchError,
    isLoading: isSearchLoading,
    isFetching: isSearchFetching,
  } = useQuery({
    queryKey: ['searchFriends'],
    queryFn: ({ signal }) => {
      if (searchFriendQuery.profile === 0) return;
      return searchFriendsFn(searchFriendQuery, signal);
    },
    enabled: false,
  });

  const { mutate: sendInvitation, isSuccess } = useMutation(
    (data: { event_id: number; ids: number[] }) => sendEventInvitationFn(data)
  );

  const getFocusInputSearchState = (state: boolean) => {
    setIsOnFocus(state);
  };

  const getSearchValue = (value: string) => {
    setSearchFriendQuery({
      ...searchFriendQuery,
      username: value,
    });
  };

  const handleClickSendInvitation = (e: any) => {
    e.preventDefault();
    if (!eventState.invited_participants_ids) return;
    const data = {
      event_id: location.state.eventId,
      ids: eventState.invited_participants_ids,
    };
    const isValid = inviteParticipantSchema.safeParse(data);
    if (!isValid.success) return;
    sendInvitation(data);
    if (isSuccess) {
      toast.success('Invitation sent');
      navigate(-1);
    }
  };

  const loading =
    isLoading || isSearchLoading || isFetching || isSearchFetching;

  useEffect(() => {
    refetchSearchFriends();
  }, [searchFriendQuery]);
  return (
    <>
      <ReturnBtn />
      <TitleH2 value="Invite your friends" />
      <div className="px-4">
        <SearchInput
          getFocusState={getFocusInputSearchState}
          onChange={getSearchValue}
        />
        <SwitchMutateOrUpdate
          data={isOnFocus ? searchedFriends : friends}
          loading={loading}
          variant={variant}
        />
      </div>
      {variant === 'mutate' && (
        <div className="flex w-full justify-center px-2">
          <Button
            textContent="Send Invitation"
            type="submit"
            onClick={handleClickSendInvitation}
          />
        </div>
      )}
    </>
  );
}

export default Invite;
