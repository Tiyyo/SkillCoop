import { useState } from "react";

function Hamburger() {
  const [openMenu, setOpenMenu] = useState(false);
  const handleClickMenu = () => {
    setOpenMenu(!openMenu);
  }

  return (
    <button className="flex flex-col gap-y-1.5 w-10" onClick={handleClickMenu}>
      <span
        className={`rounded-lg h-1 bg-white ease-cubic duration-300 w-1/2 ${
          openMenu
            ? "origin-bottom rotate-45 translate-x-[2px] translate-y-[1px]"
            : ""
        }`}
      ></span>
      <span
        className={`rounded-lg h-1 bg-white ease-cubic duration-300 w-full ${
          openMenu ? "origin-top -rotate-45" : ""
        }`}
      ></span>
      <span
        className={`rounded-lg h-1 bg-white ease-cubic duration-300 ${
          openMenu
            ? "origin-bottom w-1/2   translate-x-4 -translate-y-[4px] rotate-45 "
            : "w-3/4"
        }`}
      ></span>
    </button>
  );
}

export default Hamburger;
