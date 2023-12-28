import { Link } from 'react-router-dom';

function ErrorFallback() {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-sm text-primary-1100">Something went wrong</p>
      <Link to="/" className="text-xs">
        Go back to home
      </Link>
    </div>
  );
}

export default ErrorFallback;
