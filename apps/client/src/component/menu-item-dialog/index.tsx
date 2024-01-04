import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../lib/ui/alert-dialog';
import { UseMutateFunction } from '@tanstack/react-query';
import { cn } from '../../lib/utils';

type MenuItemDialogProps = {
  description?: string;
  mutateFn: UseMutateFunction<any, unknown, any, unknown>;
  children: React.ReactNode;
  mutationData?: any;
  hoverOn?: boolean;
};

function MenuItemDialog({
  children,
  description,
  mutateFn,
  mutationData,
  hoverOn,
}: MenuItemDialogProps) {
  const menuItemStyle = `flex gap-2 items-center
    transition-colors duration-300 rounded-lg px-2 text-md`;

  const handleClick = () => {
    if (!mutateFn) return;
    mutateFn(mutationData);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn(
          hoverOn ? 'hover:bg-primary-200' : '',
          menuItemStyle,
          `w-full h-10 `,
        )}
      >
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-base-light w-4/5 rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="bg-primary-800 hover:bg-primary-400 
            duration-300"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="hover:text-primary-900 duration-200"
            onClick={handleClick}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default MenuItemDialog;
