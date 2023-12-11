import { Link } from 'react-router-dom';

function HeaderLandingPage() {
  return (
    <header className="h-20 py-5 px-4 flex justify-between items-center">
      <div>
        <p className="font-semibold text-sm md:text-md lg:text-2xl text-dark">
          Skill<span className="text-primary-100">coop</span>
        </p>
      </div>
      <div className="text-sm flex items-center gap-x-2">
        <Link to="/login" className="text-grey-sub-text">
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2  bg-primary-200 font-semibold text-primary-100 
              border border-primary-100 rounded-full"
        >
          Join us
        </Link>
      </div>
    </header>
  );
}

export default HeaderLandingPage;
