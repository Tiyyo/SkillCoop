import { Link } from "react-router-dom";
import Avatar from "../avatar";
import Hamburger from "../hamburger";
import TitleH1 from "../title-h1";
import Plus from "../../assets/icon/Plus";

interface HeaderProps {
  title: string;
  isPlusExist?: boolean;
  linkFromPlus?: string;
}

function Header({ title, isPlusExist, linkFromPlus }: HeaderProps) {
  return (
    <div className="bg-primary-800 h-36 py-4 px-3 flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <Hamburger />
        <Avatar />
      </div>
      <div className="flex items-end justify-between px-2">
        <TitleH1 title={title} />
        {isPlusExist && linkFromPlus && (
          <Link
            to={linkFromPlus}
            className="text-white border-2 rounded-full p-0.5"
          >
            <Plus />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
