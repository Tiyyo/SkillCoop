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
        className="flex cursor-pointer items-center gap-4 rounded-lg px-2 
        py-2 text-primary-600 transition-colors duration-300 
      hover:bg-primary-200"
      >
        {children}
        <p className="text-lg text-primary-1100">{value}</p>
      </NavLink>
    </li>
  );
}

export default NavMobileLink;
