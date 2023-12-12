import { NavLink } from 'react-router-dom';

type NavMobileLinkProps = {
  to: string;
  value: string;
  children?: React.ReactNode;
  setClose: (value: boolean) => void;
};

function NavMobileLink({ children, to, value, setClose }: NavMobileLinkProps) {
  return (
    <li onClick={() => setClose(false)}>
      <NavLink
        to={to}
        className="flex items-center gap-4 text-primary-600 cursor-pointer py-2 hover:bg-primary-200 transition-colors duration-300 rounded-lg px-2"
      >
        {children}
        <p className="text-primary-1100 text-lg">{value}</p>
      </NavLink>
    </li>
  );
}

export default NavMobileLink;
