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
import { useNavigate } from 'react-router-dom';

interface MenuItemDialogProps {
  description?: string;
  mutateFn: UseMutateFunction<any, unknown, any, unknown>;
  children: React.ReactNode;
  mutationData?: any;
  redirection?: string;
}

function MenuItemDialog({
  children,
  description,
  mutateFn,
  mutationData,
  redirection,
}: MenuItemDialogProps) {
  const menuItemStyle = ` flex gap-2 items-center hover:bg-primary-200 
  transition-colors duration-300 rounded-lg px-2 text-md`;

  const navigate = useNavigate();

  const handleClick = () => {
    if (!mutateFn) return;
    mutateFn(mutationData);
    if (redirection) navigate(redirection);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className={menuItemStyle + 'w-full h-10'}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-base-light w-4/5 rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:text-primary-900 duration-200">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-primary-800 hover:bg-primary-400 duration-300"
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
