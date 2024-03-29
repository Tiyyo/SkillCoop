import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import capitalize from '../../shared/utils/capitalize';

type MenuSettingItemProps = {
  link: string;
  children: React.ReactNode;
  name: string;
};

function MenuSettingItem({ link, children, name }: MenuSettingItemProps) {
  return (
    <div
      className="cur flex items-center justify-between
       rounded-lg px-1.5 py-3.5 hover:bg-primary-210"
    >
      <div className="flex items-center">
        <span className="pr-2.5">{children}</span>
        <span className="">{capitalize(name)}</span>
      </div>
      <Link to={link} className="flex flex-grow justify-end">
        <ChevronRight size={18} />
      </Link>
    </div>
  );
}

export default MenuSettingItem;
