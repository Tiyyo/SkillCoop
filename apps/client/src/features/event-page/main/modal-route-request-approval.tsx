import { X } from 'lucide-react';
import capitalize from '../../../shared/utils/capitalize';
/* eslint-disable-next-line */
import associateNumberToString from '../../../shared/utils/associate-number-string-scale';
import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '../../../lib/utils';
import ImageWithFallback from '../../../shared/components/image/index';
import { useGetProfile } from '../../../shared/hooks/useProfile';
import { useUpdateParticipant } from '../../../shared/hooks/useSingleEvent';
import toast from '../../../shared/utils/toast';
import { updateParticipantSchema } from '@skillcoop/schema/src';
import { useTranslation } from 'react-i18next';

function ModalRouteRequestApprovalEvent() {
  const navigate = useNavigate();
  const { t } = useTranslation('event');
  const { eventId, profileId: requesterProfileId } = useParams<{
    eventId: string;
    profileId: string;
  }>();
  const { data: requesterProfile } = useGetProfile({
    profileId: requesterProfileId,
  });

  const { mutate: updateRequesterStatus } = useUpdateParticipant({
    eventId: Number(eventId),
    onSuccess: () => {
      toast.success(
        t('toast:statusHasBeenUpdated', {
          username: requesterProfile?.username,
        }),
      );
      navigate(-1);
    },
  });

  function handleClickRequest(status: 'confirmed' | 'refused') {
    if (!requesterProfileId) return;
    const updateDate = {
      event_id: Number(eventId),
      profile_id: requesterProfileId,
      status_name: status,
    };
    const isValid = updateParticipantSchema.safeParse(updateDate);
    if (!isValid.success) {
      return toast.error('Invalid data');
    }
    updateRequesterStatus({
      event_id: Number(eventId),
      profile_id: requesterProfileId,
      status_name: status,
    });
  }

  return (
    <div
      className="animate-in fixed inset-0 z-50 
          max-h-screen animate-opacity-in overflow-hidden 
          opacity-0 backdrop-blur-sm"
    >
      <div
        className="bg-background  animate-in animate-in fixed left-[50%] 
          top-[50%] z-50 grid w-full max-w-lg 
          translate-x-[-50%] translate-y-[-50%] animate-opacity-in gap-4 
          border border-border bg-base-light p-6 opacity-0 shadow-lg 
          duration-200 sm:rounded-lg md:w-full"
      >
        <div className="flex justify-end">
          <X
            size={24}
            className="transition-color cursor-pointer duration-300 
            hover:text-primary-1000 hover:opacity-75"
            onClick={() => navigate(-1)}
          />
        </div>
        <>
          <div className="flex items-center gap-6 leading-7">
            <ImageWithFallback
              url={requesterProfile?.avatar_url ?? null}
              alt="profile avatar"
              className={cn('rounded-full')}
              size={64}
            />
            <div>
              <p>{capitalize(requesterProfile?.username)}</p>
              <p className="text-xs text-grey-sub-text">
                {t('skill:level')} :{' '}
                <span>
                  {requesterProfile?.last_evaluation ? (
                    <>
                      {t(
                        `skill:${associateNumberToString(
                          requesterProfile?.last_evaluation,
                        )}`,
                      )}
                    </>
                  ) : (
                    'NC'
                  )}
                </span>
              </p>
            </div>
          </div>
          <div className="flex w-full justify-center gap-x-8">
            <button
              className="rounded-md border border-border 
              px-3 py-1  text-text-base outline-1 outline-primary-100 
              duration-300 hover:bg-primary-200"
              onClick={() => handleClickRequest('refused')}
            >
              {t('refuse')}
            </button>
            <button
              className="rounded-md border border-border 
            bg-primary-800  px-3 py-1 text-text-base outline-1 
              duration-300 hover:bg-primary-400"
              onClick={() => handleClickRequest('confirmed')}
            >
              {t('accept')}
            </button>
          </div>
        </>
      </div>
    </div>
  );
}

export default ModalRouteRequestApprovalEvent;
