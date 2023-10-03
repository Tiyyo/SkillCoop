import { cn } from '../../lib/utils';
import { ComponentPropsWithRef } from 'react';

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  textContent: string;
  type: 'button' | 'submit' | undefined;
  className?: string;
}

function Button({ textContent, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'bg-primary-800 hover:bg-primary-900 transition-colors text-white py-2 px-3 w-[70%] max-w-xs rounded-md cursor-pointer font-bold uppercase shadow-sm',
        className
      )}>
      {textContent}
    </button>
  );
}

export default Button;
