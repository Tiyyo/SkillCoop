import { cn } from '../lib/utils';

function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('bg-base-light p-5 shadow lg:rounded-lg ', className)}>
      {children}
    </div>
  );
}

export default Container;
