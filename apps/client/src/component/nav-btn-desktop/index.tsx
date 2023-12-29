import { NavLink } from 'react-router-dom';

type NavButtonDesktopProps = {
  children?: JSX.Element;
  path: string;
  content: string;
};

const baseStyle = `relative overflow-hidden duration-300 
                   w-5/6 h-12 flex items-center gap-x-2 pl-5 
                   rounded-r-lg cursor-pointer`;

function NavButtonDesktop({ children, path, content }: NavButtonDesktopProps) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => {
        return isActive
          ? `${baseStyle} bg-primary-20 text-primary-100`
          : `${baseStyle}  text-grey-regular`;
      }}
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <div
              className={`absolute bg-primary-100 w-3 h-full 
              rounded-3xl -left-1.5`}
            ></div>
          )}

          {children}
          <p>{content}</p>
        </>
      )}
    </NavLink>
  );
}

export default NavButtonDesktop;
