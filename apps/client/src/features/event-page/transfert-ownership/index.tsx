/* eslint-disable indent */
import type { EventType } from '@skillcoop/types/src';
import { invitationStatus } from '@skillcoop/types/src';
import { updateOrganizerSchema } from '@skillcoop/schema/src';
import Avatar from '../../../shared/components/avatar';
import { useState } from 'react';
import Button from '../../../shared/components/button';
import { useNavigate } from 'react-router-dom';
import { useTransfertOwnership } from '../../../shared/hooks/useSingleEvent';
import { useEvent } from '../store/event.store';
/*eslint-disable-next-line*/
import associateNumberToString from '../../../shared/utils/associate-number-string-scale';
import { cn } from '../../../lib/utils';
import Container from '../../../shared/layouts/container';
import TitleH2 from '../../../shared/components/title-h2';
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
    <Container className="flex flex-grow flex-col lg:mt-4">
      <TitleH2
        title={t('title:transfertRights')}
        legend={t('title:transfertRightsLegend')}
      />
      <form
        className="flex h-full w-full flex-grow 
        flex-col items-center justify-between"
        onSubmit={handleSubmitTransfert}
      >
        <div className="h-full w-full">
          {participants && (
            <div
              className={cn(
                'my-2 grid grid-cols-2 content-start gap-2 py-8',
                participants.length === 0 && 'grid-cols-1',
              )}
            >
              {participants.length === 0 && (
                <div
                  className="w-full py-4 text-center text-xs italic
                   text-light"
                >
                  {t('noParticipantsFound')}
                </div>
              )}
              {participants.map((participant) => (
                <div
                  className={cn(
                    `flex max-h-16 cursor-pointer gap-3 rounded-md 
                  border-2  border-transparent px-3 py-2`,
                    selectedProfile === participant.profile_id
                      ? `border-primary-400 border-opacity-50 bg-primary-500 
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
