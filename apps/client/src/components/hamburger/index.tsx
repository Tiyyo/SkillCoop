import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

function Hamburger({
  getOpenState,
  closeState,
}: {
  getOpenState: (state: boolean) => void;
  closeState: boolean;
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const handleClickMenu = () => {
    setOpenMenu(!openMenu);
    getOpenState(!openMenu);
  };

  useEffect(() => {
    setOpenMenu(closeState);
  }, [closeState]);

  return (
    <button
      className="relative z-30 ml-2 flex w-8 
      flex-col gap-y-1 self-center lg:hidden"
      onClick={handleClickMenu}
    >
      <span
        className={cn(
          'h-0.5 w-1/2 rounded-lg duration-300 ease-cubic',
          openMenu &&
            `origin-bottom translate-x-[3px] translate-y-[0px] 
             rotate-45 bg-primary-100`,
          !openMenu && 'bg-slate-400',
        )}
      ></span>
      <span
        className={`h-0.5 w-full  rounded-lg duration-300 ease-cubic ${
          openMenu ? 'origin-top -rotate-45 bg-primary-100' : 'bg-slate-400'
        }`}
      ></span>
      <span
        className={cn(
          'h-0.5 rounded-lg duration-300 ease-cubic',
          openMenu &&
            `w-1/2 origin-bottom -translate-y-[1px] translate-x-3.5 
            rotate-45 bg-primary-100`,
          !openMenu && 'w-3/4 bg-slate-400',
        )}
      ></span>
    </button>
  );
}

export default Hamburger;
