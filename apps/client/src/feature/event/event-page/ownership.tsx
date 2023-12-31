/* eslint-disable indent */
import type { EventType } from '@skillcoop/types/src';
import { invitationStatus } from '@skillcoop/types/src';
import { updateOrganizerSchema } from '@skillcoop/schema/src';
import Avatar from '../../../component/avatar';
import { useState } from 'react';
import Button from '../../../component/button';
import { useNavigate } from 'react-router-dom';
import { useTransfertOwnership } from '../../../hooks/useSingleEvent';
import { useEvent } from '../../../store/event.store';
/*eslint-disable-next-line*/
import associateNumberToString from '../../../utils/associate-number-stringscale';
import { cn } from '../../../lib/utils';
import Container from '../../../layout/container';
import TitleH2 from '../../../component/title-h2';
import { useTranslation } from 'react-i18next';

type TransfertOwnershipProps = {
  data: EventType;
  profileId: number;
};

function TransfertOwnership({
  data: event,
  profileId,
}: TransfertOwnershipProps) {
  const { t } = useTranslation('system');
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
    event.participants.filter((participant) => {
      return (
        participant.profile_id !== profileId &&
        participant.status === invitationStatus.confirmed
      );
    });

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
  //Shitty as fuck
  return (
    <Container className="lg:mt-4 flex-grow flex flex-col">
      <TitleH2
        title={t('title:transfertRights')}
        legend={t('title:transfertRightsLegend')}
      />
      <form
        className="flex-grow flex flex-col justify-between 
        items-center w-full h-full"
        onSubmit={handleSubmitTransfert}
      >
        <div className="w-full h-full">
          {participants && (
            <div
              className={cn(
                'grid grid-cols-2 py-8 gap-2 my-2 content-start',
                participants.length === 0 && 'grid-cols-1',
              )}
            >
              {participants.length === 0 && (
                <div
                  className="text-center w-full italic text-xs py-4
                   text-light"
                >
                  {t('noParticipantsFound')}
                </div>
              )}
              {participants.map((participant) => (
                <div
                  className={cn(
                    `flex py-2 px-3 gap-3 max-h-16 
                  cursor-pointer  rounded-md border-2 border-transparent`,
                    selectedProfile === participant.profile_id
                      ? `border-opacity-50 border-primary-400 bg-primary-500 
                         shadow-2xl`
                      : 'bg-base-light',
                  )}
                  onClick={() => setSelectedProfile(participant.profile_id)}
                >
                  <Avatar avatar={participant.avatar} />
                  <div className="flex flex-col gap-2">
                    <p className="text-xs">{participant.username}</p>
                    <div className="flex items-center gap-x-3">
                      <p className="text-xxs text-light">
                        {participant.last_evaluation
                          ? t(
                              'skill:' +
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
          textContent={t('transfert')}
          type="submit"
          variant="light"
          isLoading={isLoading}
        />
      </form>
    </Container>
  );
}

export default TransfertOwnership;
