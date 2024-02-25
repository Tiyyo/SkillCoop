import { useRef, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import Input from '../input';
import { useQuery } from '@tanstack/react-query';
import { useOnClickOutside } from '../../hooks/useClickOutside';
import useResetError from '../../hooks/useResetError';

type InputGeocodeProps<T> = {
  formId?: string;
  nbOfSuggestions: number;
  children?: React.ReactNode;
  titleKey: string;
  locationKey: string;
  queryFn: (query: string) => Promise<any>;
  getLocationDataState: (state: T) => void;
  label?: string;
  name: string;
  placeholder?: string;
  extractDataMethod?: (suggestion: any) => T;
  defaultValue?: string;
  error?: boolean;
  disabled?: boolean;
};

function SearchSelect<T>({
  label,
  name,
  placeholder,
  nbOfSuggestions,
  children,
  titleKey,
  locationKey,
  queryFn,
  getLocationDataState,
  formId,
  extractDataMethod,
  defaultValue,
  error,
  disabled,
}: InputGeocodeProps<T>) {
  const [query, setQuery] = useState<string | undefined>(undefined);
  const suggestionContainer = useRef<HTMLUListElement>(null);
  const debounceQueryValue = useDebounce(query, 350);
  const [suggestionsAreVisible, setSuggestionsAreVisible] = useState(false);
  const { hasError, setHasError } = useResetError(error);

  const { data } = useQuery(
    ['geocoding', debounceQueryValue],
    () => {
      if (!query) return null;
      if (!debounceQueryValue || query.length < 3) return null;
      return queryFn(debounceQueryValue);
    },
    {
      enabled: true,
    },
  );
  const suggestions = data?.features || data;

  function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);

    if (event.target.value.length > 2) {
      setSuggestionsAreVisible(true);
    }
  }

  function handleClickSuggest(suggestion: any) {
    setHasError(false);
    setQuery(suggestion[titleKey]);
    if (extractDataMethod) {
      return getLocationDataState(extractDataMethod(suggestion));
    }
    return getLocationDataState(suggestion);
  }

  const handleClickOutside = () => {
    setSuggestionsAreVisible(false);
  };

  useOnClickOutside(suggestionContainer, handleClickOutside, 'mousedown');

  return (
    <div className="relative flex w-full flex-col gap-y-1">
      <Input
        value={query ?? defaultValue}
        name={name}
        label={label}
        placeholder={placeholder}
        onChange={handleChangeInput}
        onFocus={() => setSuggestionsAreVisible(true)}
        form={formId}
        error={hasError}
        disabled={disabled}
        high
      >
        {children}
      </Input>
      {suggestionsAreVisible && suggestions && suggestions.length > 0 && (
        <ul
          ref={suggestionContainer}
          className="absolute top-24 z-10 w-[calc(100%-38px)] cursor-pointer 
          self-end rounded-lg border border-border bg-base px-1.5 py-3"
        >
          {suggestions.slice(0, nbOfSuggestions).map((suggestion: any) => (
            <li
              className="mb-2 rounded-lg px-4 py-2 hover:bg-footer"
              key={suggestion.id}
              onClick={() => handleClickSuggest(suggestion)}
            >
              <p className="text-sm font-semibold text-text-base">
                {suggestion[titleKey]}
              </p>
              <p className="text-xxs text-light">{suggestion[locationKey]}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchSelect;
