import { cn } from '../lib/utils';

function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'bg-base-light mx-2 my-1 rounded-md shadow py-4 px-3 ',
        className
      )}>
      {children}
    </div>
  );
}

export default Container;
