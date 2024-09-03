import { MapPin } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { searchPlaygroundFn } from '../../api/playground';
import InputGeocode from '../../shared/components/search-select';
import { useTranslation } from 'react-i18next';

type InputLocationProps = {
  updateLocationId?: (value: number) => void;
  updateLocationNameAndId?: (locationId: number, location: string) => void;
  error?: boolean;
  defaultValue?: string | undefined;
  setCreatePlayground?: Dispatch<SetStateAction<boolean>>;
  label: string;
  disabled?: boolean;
  placeholder?: string;
  formid?: string;
};

function InputLocation({
  updateLocationId,
  updateLocationNameAndId,
  setCreatePlayground,
  defaultValue,
  error,
  label,
  disabled,
  placeholder,
  formid,
}: InputLocationProps) {
  const { t } = useTranslation('event');

  const getPlaygroundChoose = (value: {
    city: string;
    name: string;
    id: number;
  }) => {
    if (updateLocationId) updateLocationId(value.id);
    if (updateLocationNameAndId) updateLocationNameAndId(value.id, value.name);
  };

  return (
    <div className="flex flex-col items-center">
      <InputGeocode
        nbOfSuggestions={5}
        name="location"
        label={label}
        placeholder={placeholder}
        queryFn={searchPlaygroundFn}
        titleKey="name"
        locationKey="city"
        getLocationDataState={getPlaygroundChoose}
        disabled={disabled}
        defaultValue={defaultValue}
        error={error}
        formid={formid}
      >
        <MapPin />
      </InputGeocode>
      {setCreatePlayground && (
        <p className="w-3/4 text-xs text-light">
          {t('cantFindPlayground')}{' '}
          <span
            className="cursor-pointer font-medium text-primary-100"
            onClick={() => setCreatePlayground(true)}
          >
            {t('auth:here')}
          </span>{' '}
        </p>
      )}
    </div>
  );
}

export default InputLocation;
