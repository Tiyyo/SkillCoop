import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getGeoCodingFn } from '../../api/mapbox';
import Button from '../../shared/components/button';
import type { Playground } from '@skillcoop/types/src';
import { createPlaygroundFn } from '../../api/playground';
import { playgroundSchema } from '@skillcoop/schema/src';
import Stadium from '../../assets/icon/Stadium';
import toast from '../../shared/utils/toast';
import InputGeocode from '../../shared/components/search-select';
import { Dialog, DialogContent, DialogTrigger } from '../../lib/ui/dialog';
import Input from '../../shared/components/input';
import capitalize from '../../shared/utils/capitalize';
import { DialogClose } from '@radix-ui/react-dialog';
import { useTranslation } from 'react-i18next';
/*eslint-disable*/
import { extractLocationInfosMapboxApi } from '../../shared/utils/extract-location-mapbox';
/*eslint-enable*/

function AddNewPlayground() {
  const { t } = useTranslation('event');
  const triggerOpenModalRef = useRef<HTMLButtonElement>(null);
  const closeModalRef = useRef<HTMLButtonElement>(null);
  const [locationInfos, setLocationInfos] = useState<Playground>();
  const { mutate: addPlayground } = useMutation({
    mutationFn: async (data: Playground) => {
      return createPlaygroundFn(data);
    },
    onSuccess: () => {
      toast.success(t('toast:playgroundHasBeenCreated'));
    },
    onError: () => {
      toast.error(t('toast:playgroundNotCreated'));
    },
  });
  const getLocationInfos = (infos: Playground) => {
    setLocationInfos(infos);
  };

  function handleCreatePlayground() {
    const isValid = playgroundSchema.safeParse(locationInfos);
    if (!isValid.success) {
      triggerOpenModalRef?.current?.click();
    }
    if (isValid.success && locationInfos) {
      addPlayground(locationInfos);
    }
  }

  const isComplete =
    locationInfos && Object.values(locationInfos).every((i) => i);
  if (isComplete && closeModalRef) {
    closeModalRef.current?.click();
  }

  const handleSubmitPlayground = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    locationInfos &&
      Object.keys(locationInfos).forEach((key) => {
        if ((e.target as HTMLFormElement)[key]?.value) {
          setLocationInfos((prev) => {
            if (!prev) return;
            return {
              ...prev,
              [key]: (e.target as HTMLFormElement)[key].value,
            };
          });
        }
      });
  };
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <form id="create-playground" onSubmit={handleSubmitPlayground} />
      <Dialog>
        <DialogTrigger ref={triggerOpenModalRef}></DialogTrigger>
        <DialogContent className="bg-base text-text-base">
          <DialogClose ref={closeModalRef} />
          <h3 className="mx-auto w-4/5 text-center text-sm">
            {t('needMoreInfosPlayground')}
          </h3>
          <div className="flex w-full flex-col items-center">
            {locationInfos &&
              Object.entries(locationInfos).map(([key, value]) => {
                if (key === 'name')
                  return (
                    <Input
                      id={key}
                      defaultValue={value}
                      placeholder={
                        (value as string) ?? 'Complete this information'
                      }
                      label={capitalize(key)}
                      formId="create-playground"
                      high
                    />
                  );
                if (value) return;
                if (key !== 'latitude' && key !== 'longitude')
                  return (
                    <Input
                      id={key}
                      value={value}
                      placeholder="Complete this information"
                      label={capitalize(key)}
                      formId="create-playground"
                      high
                    />
                  );
              })}
            <button
              type="submit"
              form="create-playground"
              value="valider"
              className="my-2 rounded-xl border border-border bg-base px-4 py-2 
              text-center text-sm text-primary-1100"
            >
              {t('system:confirm')}
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <InputGeocode<Playground>
        nbOfSuggestions={4}
        name="playground"
        label={t('searchPlayground')}
        placeholder={t('typeNamePlayground')}
        titleKey="text"
        locationKey="place_name"
        queryFn={getGeoCodingFn}
        getLocationDataState={getLocationInfos}
        extractDataMethod={extractLocationInfosMapboxApi}
      >
        <Stadium />
      </InputGeocode>
      <Button
        type="button"
        textContent={t('add')}
        variant="light"
        onClick={handleCreatePlayground}
      />
    </div>
  );
}

export default AddNewPlayground;
