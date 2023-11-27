import { cn } from '../lib/utils';

function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('bg-base lg:rounded-lg shadow p-5 ', className)}>
      {children}
    </div>
  );
}

export default Container;
