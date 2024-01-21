import { useState } from 'react';
import Search from '../../assets/icon/Search';
import { useTranslation } from 'react-i18next';

type SearchInputProps = {
  getFocusState?: (state: boolean) => void;
  onChange?: (value: string) => void;
};

function SearchInput({ getFocusState, onChange }: SearchInputProps) {
  const { t } = useTranslation('title');
  const [shouldShowIcon, setShouldShowIcon] = useState(false);

  const handleFocus = () => {
    setShouldShowIcon(true);
    if (!getFocusState) return;
    getFocusState(true);
  };

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShouldShowIcon(false);
    if (!getFocusState) return;
    getFocusState(false);
    e.target.value = '';
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!onChange || !value) return;
    onChange(value);
  };

  return (
    <div className="relative h-9 w-2/3 max-w-xs">
      <input
        type="text"
        placeholder={t('search')}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChangeValue}
        className="w-full border-b-2 border-b-slate-800 border-opacity-10
        bg-transparent bg-opacity-10 py-1 text-sm 
        leading-7 outline-none transition-all duration-300 ease-cubic 
        hover:rounded-3xl 
        hover:border hover:border-primary-600 hover:px-8 hover:py-1 
        hover:outline-none focus:rounded-3xl focus:border 
        focus:border-primary-600 
        focus:bg-primary-20 focus:px-8 focus:py-1 focus:outline-none 
        focus:placeholder:opacity-0 focus:placeholder:transition-opacity 
        focus:placeholder:duration-300"
      />
      <div
        className={`absolute right-2 top-1/2 -translate-y-1/2 text-primary-600 
        transition-opacity duration-300 
        ${shouldShowIcon ? 'opacity-95' : 'opacity-0'}`}
      >
        <Search />
      </div>
    </div>
  );
}

export default SearchInput;
