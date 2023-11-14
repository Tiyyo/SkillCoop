import { EventType } from '../../../types';
import { updateOrganizerSchema } from 'schema/ts-schema';
import Avatar from '../../../component/avatar';
import { useState } from 'react';
import Button from '../../../component/button';
import { useNavigate } from 'react-router-dom';
import { useTransfertOwnership } from '../../../hooks/useSingleEvent';
import { useEvent } from '../../../store/event.store';
import capitalize from '../../../utils/capitalize';
import associateNumberToString from '../../../utils/associate-number-stringscale';
import ReturnBtn from '../../../component/return';

interface TransfertOwnershipProps {
  data: EventType;
  profileId: number;
}

function TransfertOwnership({
  data: event,
  profileId,
}: TransfertOwnershipProps) {
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  const navigate = useNavigate();
  const { updateOrganizerId } = useEvent();
  const { mutate: transfertOwnership, isLoading } = useTransfertOwnership({
    eventId: event.event_id,
    onSuccess: () => {
      if (typeof selectedProfile === 'number') {
        updateOrganizerId(selectedProfile);
      }
      navigate(`/event/${event.event_id}`, { replace: true });
    },
  });

  const participants =
    typeof event.participants !== 'string' &&
    event.participants.filter(
      (participant) => participant.profile_id !== profileId,
    );

  const handleSubmitTransfert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProfile) return;
    const data = {
      event_id: event.event_id,
      organizer_id: event.organizer_id,
      new_organizer_id: selectedProfile,
    };
    const isValid = updateOrganizerSchema.safeParse(data);
    if (isValid.success) transfertOwnership(data);
  };

  return (
    <div>
      <ReturnBtn />
      <h2 className="text-sm pl-2 py-4 text-center">
        To which participants do you want to transfer your organizer rights for
        this event ?
      </h2>
      <form
        className="flex flex-col justify-between items-center w-full h-full"
        onSubmit={handleSubmitTransfert}
      >
        <div className="w-full h-[60vh]">
          {participants && (
            <div className="grid grid-cols-2 py-8 gap-2 my-2 content-start ">
              {!participants && (
                <div className="text-center italic text-xs py-4 text-light">
                  No participants found
                </div>
              )}
              {participants.map((participant) => (
                <div
                  className={`flex py-2 px-3 gap-3 max-h-16 
                  cursor-pointer  rounded-md border-2 border-transparent ${
                    selectedProfile === participant.profile_id
                      ? ' border-opacity-50 border-primary-400 bg-primary-500 shadow-2xl'
                      : 'bg-base-light'
                  }}`}
                  onClick={() => setSelectedProfile(participant.profile_id)}
                >
                  <Avatar avatar={participant.avatar} />
                  <div className="flex flex-col gap-2">
                    <p className="text-xs">{participant.username}</p>
                    <div className="flex items-center gap-x-3">
                      <p className="text-xxs text-light">
                        {participant.last_evaluation
                          ? capitalize(
                              associateNumberToString(
                                participant.last_evaluation,
                              ),
                            )
                          : ''}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <Button
          textContent="Transfert"
          type="submit"
          variant="light"
          isLoading={isLoading}
        />
      </form>
    </div>
  );
}

export default TransfertOwnership;
