import { useState } from 'react';
import Search from '../../assets/icon/Search';

interface SearchInputProps {
  getFocusState?: (state: boolean) => void;
  onChange?: (value: string) => void;
}

function SearchInput({ getFocusState, onChange }: SearchInputProps) {
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
    <div className="relative h-9 max-w-xs w-1/2">
      <input
        type="text"
        placeholder="Search"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChangeValue}
        className="focus:rounded-3xl hover:rounded-3xl border-b-2 border-b-slate-800 border-opacity-10 bg-transparent outline-none leading-7 transition-all ease-cubic duration-300 py-1 focus:outline-none focus:py-1 focus:px-8 focus:border focus:border-primary-600 focus:placeholder:opacity-0 focus:placeholder:transition-opacity focus:placeholder:duration-300 hover:outline-none hover:py-1 hover:px-8 hover:border hover:border-primary-600 text-sm w-full"
      />
      <div
        className={`absolute top-1/2 right-2 -translate-y-1/2 text-primary-600 transition-opacity duration-300 ${
          shouldShowIcon ? 'opacity-95' : 'opacity-0'
        }`}
      >
        <Search />
      </div>
    </div>
  );
}

export default SearchInput;
