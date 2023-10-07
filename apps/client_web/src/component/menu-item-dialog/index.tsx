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
  eventId?: number;
  profileId?: number;
  redirection?: string;
}

function MenuItemDialog({
  children,
  description,
  mutateFn,
  eventId,
  profileId,
  redirection,
}: MenuItemDialogProps) {
  const menuItemStyle =
    'flex gap-2 items-center hover:bg-primary-200 transition-colors duration-300 rounded-lg px-2 text-md';

  const navigate = useNavigate();

  const handleClick = () => {
    if (!mutateFn) return;
    mutateFn({ eventId, profileId });
    if (redirection) navigate(redirection);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className={menuItemStyle}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-base-light w-4/5 rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-primary-800"
            onClick={handleClick}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default MenuItemDialog;
