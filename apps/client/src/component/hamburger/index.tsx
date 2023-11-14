import { useState } from 'react';

function Hamburger({
  getOpenState,
}: {
  getOpenState: (state: boolean) => void;
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const handleClickMenu = () => {
    setOpenMenu(!openMenu);
    getOpenState(!openMenu);
  };

  return (
    <button
      className="relative z-30 flex flex-col gap-y-1 w-8"
      onClick={handleClickMenu}
    >
      <span
        className={`rounded-lg h-0.5 ease-cubic duration-300 w-1/2 ${
          openMenu
            ? 'origin-bottom rotate-45 translate-x-[3px] translate-y-[0px] bg-primary-800'
            : 'bg-base-light'
        }`}
      ></span>
      <span
        className={`rounded-lg h-0.5  ease-cubic duration-300 w-full ${
          openMenu ? 'origin-top -rotate-45 bg-primary-800' : 'bg-base-light'
        }`}
      ></span>
      <span
        className={`rounded-lg h-0.5 ease-cubic duration-300 ${
          openMenu
            ? 'origin-bottom w-1/2 bg-primary-800 translate-x-3.5 -translate-y-[1px] rotate-45 '
            : 'w-3/4 bg-base-light'
        }`}
      ></span>
    </button>
  );
}

export default Hamburger;
