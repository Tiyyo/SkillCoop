import { useMutation } from '@tanstack/react-query';
import { EventType } from '../../../types';
import { transfertOwnershipEventFn } from '../../../api/api.fn';
import { updateOrganizerSchema } from 'schema/ts-schema';
import Avatar from '../../../component/avatar';
import { useState } from 'react';
import Button from '../../../component/button';
import { useNavigate } from 'react-router-dom';

interface TransfertOwnershipProps {
  data: EventType;
  profileId: number;
}

type UpdateOwnership = {
  event_id: number;
  organizer_id: number;
  new_organizer_id: number;
};

function TransfertOwnership({
  data: event,
  profileId,
}: TransfertOwnershipProps) {
  const [selectedProfile, setSelectedProfile] = useState<number | null>(null);
  const navigate = useNavigate();
  const { mutate: transfertOwnership, isLoading } = useMutation(
    (data: UpdateOwnership) => transfertOwnershipEventFn(data)
  );
  const participants =
    typeof event.participants !== 'string' &&
    event.participants.filter(
      (participant) => participant.profile_id !== profileId
    );

  return (
    <div>
      <h2 className="text-sm pl-2 py-4 text-center">
        To which participants do you want to transfer your organizer rights for
        this event ?
      </h2>
      <form
        className="flex flex-col justify-between items-center w-full h-full"
        onSubmit={(e) => {
          e.preventDefault();
          if (!selectedProfile) return;
          const data = {
            event_id: event.event_id,
            organizer_id: event.organizer_id,
            new_organizer_id: selectedProfile,
          };
          console.log(data);
          const isValid = updateOrganizerSchema.safeParse(data);
          console.log('Schema update organizer validity : ', isValid);
          if (isValid.success) {
            transfertOwnership(data);
            navigate(`/event/${event.event_id}`, { replace: true });
          }
        }}>
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
                  className={`flex py-2 px-3 gap-3 max-h-16 cursor-pointer  rounded-md border-2 border-transparent ${
                    selectedProfile === participant.profile_id
                      ? ' border-opacity-50 border-primary-400 bg-primary-500 shadow-2xl'
                      : 'bg-base-light'
                  }}`}
                  onClick={() => setSelectedProfile(participant.profile_id)}>
                  <Avatar avatar={participant.avatar} />
                  <div className="flex flex-col gap-2">
                    <p className="text-xs">{participant.username}</p>
                    <div className="flex items-center gap-x-3">
                      {/* TODO : add last evaluation recorded to event query */}
                      {/* <p className="text-xxs text-light">
                      {lastEvaluationRecorded
                        ? capitalize(
                            associateNumberToString(lastEvaluationRecorded)
                          )
                        : ''}
                    </p> */}
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
