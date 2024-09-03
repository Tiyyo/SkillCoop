import { useRef, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { useOnClickOutside } from '../../hooks/useClickOutside';
import useResetError from '../../hooks/useResetError';
import { cn } from '../../../lib/utils';

type InputGeocodeProps<T> = {
  formid?: string;
  nbOfSuggestions: number;
  children?: React.ReactNode;
  titleKey: string;
  locationKey: string;
  currentLocationState?: string | null;
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
  formid,
  extractDataMethod,
  error,
  disabled,
  currentLocationState,
}: InputGeocodeProps<T>) {
  const [query, setQuery] = useState<string | undefined>(undefined);
  const { hasError, setHasError } = useResetError(error);
  const [inputValue, setInputValue] = useState(currentLocationState || '');
  const [suggestionsAreVisible, setSuggestionsAreVisible] = useState(false);

  const suggestionContainer = useRef<HTMLUListElement>(null);
  const debounceQueryValue = useDebounce(query, 350);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasError(false);
    if (e.target.value.length > 2) {
      setSuggestionsAreVisible(true);
    }
    setInputValue(e.target.value);
    setQuery(e.target.value);
  };

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

  function handleClickSuggest(suggestion: any) {
    setHasError(false);
    setInputValue(suggestion[titleKey]);
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
      <div className="flex w-full items-center gap-x-2.5 py-4">
        <div
          className={`basis-7 ${hasError ? 'text-error' : 'text-primary-100'}`}
        >
          {children}
        </div>
        <div className="flex flex-grow flex-col gap-y-1">
          <label
            htmlFor={name}
            className="ml-2 block h-4 text-xs font-medium text-grey-sub-text "
          >
            {label}
          </label>
          <input
            name={name}
            form={formid}
            placeholder={placeholder}
            id={name}
            value={inputValue ?? undefined}
            onChange={handleChange}
            disabled={disabled}
            className={cn(
              `block h-10 w-full rounded-lg border 
              border-bubble 
              bg-base-light pl-2 text-sm font-medium 
               text-primary-1100 placeholder:text-xs placeholder:font-medium 
               placeholder:text-light focus-within:ring-1 
              focus:ring-primary-600 focus-visible:outline-none`,
              disabled && 'border-none',
              hasError && 'ring-2 ring-error',
            )}
          />
        </div>
      </div>

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
