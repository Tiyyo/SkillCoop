import SearchInput from '../search-input';
import { useEffect, useState } from 'react';
import { useApp } from '../../store/app.store';
import ReturnBtn from '../return';
import TitleH2 from '../title-h2';
import Button from '../button';
import { useEvent } from '../../store/event.store';
import SwitchMutateOrUpdate from './index.switch';
import { useLocation, useNavigate } from 'react-router-dom';
import { inviteParticipantSchema } from 'schema/ts-schema';
import toast from '../../utils/toast';
import { useSendEventInvitation } from '../../hooks/useSingleEvent';
import { useSearchResultOrDefault } from '../../hooks/useSearchResultOrDefault';

interface InviteProps {
  variant: 'mutate' | 'update';
}

// One component gonna update a state in store and will manage the mutation
// The other gonna mutate data directyl without storing data in a store
function Invite({ variant = 'update' }: InviteProps) {
  const navigate = useNavigate();
  const { userProfile } = useApp();
  const { data: eventState } = useEvent();
  const location = useLocation();
  const [eventId, setEventId] = useState<number | undefined>(undefined);
  const profileId = userProfile?.profile_id;

  const { getSearchValue, data, loading } = useSearchResultOrDefault({
    profileId,
  });

  const { mutate: sendInvitation, isLoading: isInvitationLoading } =
    useSendEventInvitation({
      eventId,
      onSuccess: () => {
        toast.invitationSent();
        setTimeout(() => {
          navigate(-1);
        }, 1000);
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
      ids: eventState.participants,
      initiator: profileId,
    };
    const isValid = inviteParticipantSchema.safeParse(data);
    if (!isValid.success) {
      toast.error('Something went wrong ... Try agian later');
      return;
    }
    sendInvitation(data);
  };

  useEffect(() => {
    setEventId(location.state?.eventId);
  }, []);

  return (
    <>
      <ReturnBtn />
      <TitleH2 title="Invite your friends" />
      <div className="px-4 h-[65vh] flex flex-col justify-center">
        <SearchInput onChange={getSearchValue} />
        <SwitchMutateOrUpdate data={data} loading={loading} variant={variant} />
      </div>
      {variant === 'mutate' && (
        <div className="flex w-full justify-center px-2">
          <Button
            textContent="Send Invitation"
            type="submit"
            isLoading={isInvitationLoading}
            onClick={handleClickSendInvitation}
          />
        </div>
      )}
    </>
  );
}

export default Invite;
