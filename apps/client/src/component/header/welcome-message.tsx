import { cn } from '../../lib/utils';

function WelcomeMessage({
  username,
  className,
}: {
  username?: string;
  className?: string;
}) {
  return (
    <div className={cn(className)}>
      <p className="font-light">Welcome Back !</p>
      <p className="font-semibold">
        <span>{username}</span>
      </p>
    </div>
  );
}

export default WelcomeMessage;
