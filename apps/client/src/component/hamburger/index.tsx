import { useEffect, useState } from 'react';

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
      className="lg:hidden relative z-30 flex flex-col self-center gap-y-1 w-8 ml-2"
      onClick={handleClickMenu}
    >
      <span
        className={`rounded-lg h-0.5 ease-cubic duration-300 w-1/2 ${
          openMenu
            ? 'origin-bottom rotate-45 translate-x-[3px] translate-y-[0px] bg-primary-100'
            : 'bg-slate-400'
        }`}
      ></span>
      <span
        className={`rounded-lg h-0.5  ease-cubic duration-300 w-full ${
          openMenu ? 'origin-top -rotate-45 bg-primary-100' : 'bg-slate-400'
        }`}
      ></span>
      <span
        className={`rounded-lg h-0.5 ease-cubic duration-300 ${
          openMenu
            ? 'origin-bottom w-1/2 bg-primary-100 translate-x-3.5 -translate-y-[1px] rotate-45 '
            : 'w-3/4 bg-slate-400'
        }`}
      ></span>
    </button>
  );
}

export default Hamburger;
