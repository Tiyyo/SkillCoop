import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../../component/button';
import SearchInput from '../../../../component/search-input';
import TitleH2 from '../../../../component/title-h2';
/*eslint-disable-next-line*/
import { useSearchResultOrDefault } from '../../../../hooks/useSearchResultOrDefault';
import Container from '../../../../layout/container';
import { useEvent } from '../../../../store/event.store';
import { useApp } from '../../../../store/app.store';
import { useEffect, useState } from 'react';
import { inviteParticipantSchema } from 'schema/ts-schema';
import toast from '../../../../utils/toast';
import { useSendEventInvitation } from '../../../../hooks/useSingleEvent';
import SearchResult from './search-result';

function InvitationFromEventPage() {
  const navigate = useNavigate();
  const { userProfile } = useApp();
  const { data: eventState, updateParticipants } = useEvent();
  const location = useLocation();
  const [eventId, setEventId] = useState<number | undefined>(
    location.state?.eventId,
  );

  // get eventId from url state
  const profileId = userProfile?.profile_id;
  // useEffect(() => {
  //   setEventId(location.state?.eventId);
  // }, []);

  const {
    getSearchValue,
    data: profileSearchResult,
    loading,
  } = useSearchResultOrDefault({
    profileId,
  });

  const { mutate: sendInvitation, isLoading: isInvitationLoading } =
    useSendEventInvitation({
      eventId,
      onSuccess: () => {
        toast.invitationSent();
        updateParticipants(eventState?.staged_participants ?? []);
        setTimeout(() => {
          navigate(-1);
        }, 1500);
      },
      onError: () => {
        toast.error('Something went wrong ... Try agian later');
      },
    });

  const handleClickSendInvitation = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!eventState.participants || !eventId) {
      toast.error('Something went wrong ... Try agian later');
      navigate(-1);
      return;
    }

    const data = {
      event_id: Number(eventId),
      ids:
        eventState.staged_participants?.map((p) => Number(p.profile_id)) ?? [],
      initiator: profileId,
    };
    const isValid = inviteParticipantSchema.safeParse(data);
    if (!isValid.success) {
      toast.error('Something went wrong ... Try agian later');
      return;
    }
    sendInvitation(data);
  };

  return (
    <Container className="lg:mt-4 h-full flex-grow flex flex-col">
      <TitleH2
        title="Invite your friends"
        legend="Select the friends you'd like to invite to join this event."
      />
      <div className="flex-grow flex flex-col justify-between h-full">
        <div className="flex-grow py-4 px-4 flex flex-col justify-center">
          <SearchInput onChange={getSearchValue} />
          <div className="flex-grow overflow-y-scroll no-scrollbar">
            <SearchResult
              profileSearchResult={profileSearchResult}
              loading={loading}
            />
          </div>
        </div>
        <div className="flex w-full justify-center px-2">
          <Button
            textContent="Send Invitation"
            type="submit"
            isLoading={isInvitationLoading}
            onClick={handleClickSendInvitation}
          />
        </div>
      </div>
    </Container>
  );
}

export default InvitationFromEventPage;
