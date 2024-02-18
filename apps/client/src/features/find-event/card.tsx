/*eslint-disable*/
import { useTranslation } from 'react-i18next';
import ImageWithUsernamefallback from '../../shared/components/image-fallback-username';
import { useSendRequestToJoinEvent } from '../../shared/hooks/useSingleEvent';
import { useApp } from '../../shared/store/app.store';
import associateNumberToString from '../../shared/utils/associate-number-string-scale';
import capitalize from '../../shared/utils/capitalize';
import { getEventFormatbyRequiredParticipants } from '../../shared/utils/get-format-event';
/*eslint-enable*/

type NearEventCardProps = {
  eventId: number;
  requiredParticipants: number;
  confirmedParticipants: number;
  organizerAvatar: string | null;
  organizerUsername: string;
  date: string;
  duration: number;
  averageEventEvaluation: number;
  playgroundName: string;
  playgroundCity: string;
  price: number | undefined | null;
  startTime: string;
  country: string | null | undefined;
  latitude: number | null;
  longitude: number | null;
  distance: number;
};

function NearEventCard({
  eventId,
  requiredParticipants,
  confirmedParticipants,
  organizerAvatar,
  organizerUsername,
  date,
  startTime,
  duration,
  averageEventEvaluation,
  playgroundName,
  playgroundCity,
  price,
  country,
  latitude,
  longitude,
  distance,
}: NearEventCardProps) {
  const { userId } = useApp();
  const { t } = useTranslation('event');
  const { mutate: sendRequestToJoinEvent } = useSendRequestToJoinEvent({
    eventId,
    country,
    distance,
    latitude,
    longitude,
  });

  const handleClickRequestToJoinEvent = () => {
    if (userId) {
      sendRequestToJoinEvent({
        event_id: eventId,
        profile_id: userId,
      });
    }
  };

  const playgroundHasPrice = price !== null && price !== undefined && price > 0;

  return (
    <div
      className="bg-blurry relative flex h-auto max-h-80 
                flex-col place-items-stretch rounded-md border-2 
                border-border bg-base bg-opacity-20 bg-contain 
                bg-[right_13rem_top_6rem] px-4 pb-5 pt-10"
    >
      <p
        className="absolute right-3 top-3 text-xxs font-light 
                  text-text-base"
      >
        {t('freeSpotsRemaining')} :{' '}
        <span className="text-xs font-semibold text-primary-1100">
          {requiredParticipants - confirmedParticipants}
        </span>
      </p>
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <ImageWithUsernamefallback
            avatar={organizerAvatar}
            username={organizerUsername}
            size={48}
          />
        </div>
        <ul className="grid grid-cols-2 items-center gap-x-3 gap-y-1 text-xs">
          <li className="text-light">{t('date')}</li>
          <li className="font-semibold text-text-base">
            {date} at {startTime}
          </li>
          <li className="text-light">{t('duration')}</li>
          <li className="font-semibold text-text-base">{duration}min</li>
          <li className="text-light">{t('format')}</li>
          <li className="font-semibold text-text-base">
            {getEventFormatbyRequiredParticipants(requiredParticipants)}
          </li>
          <li className="text-light">{t('averageParticipantsLevel')}</li>
          <li className="font-semibold text-text-base">
            {capitalize(associateNumberToString(averageEventEvaluation))}
          </li>
          <li className="text-light">{t('location')}</li>
          <li className="flex flex-col font-semibold text-text-base">
            <span className="">{playgroundName}</span>
            <span className="text-grey-sub-text">{playgroundCity}</span>
          </li>
          {playgroundHasPrice && <li className="text-light">{t('price')}</li>}
          {playgroundHasPrice && (
            <li>
              {price / requiredParticipants}€{' '}
              <span className="text-light">/per</span>
            </li>
          )}
        </ul>
      </div>
      <div className="my-2 flex flex-grow items-end justify-end">
        <button
          className="h-8 rounded-md bg-primary-20 px-4 
                    py-2 text-xs"
          onClick={handleClickRequestToJoinEvent}
        >
          {t('sendRequest')}
        </button>
      </div>
    </div>
  );
}

export default NearEventCard;
