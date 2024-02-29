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
} from '../../../lib/ui/alert-dialog';
import { UseMutateFunction } from '@tanstack/react-query';
import { cn } from '../../../lib/utils';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('system');
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
          hoverOn && 'hover:bg-primary-200',
          menuItemStyle,
          `h-10 w-full `,
        )}
      >
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent
        className="w-4/5 rounded-lg border 
        border-border bg-base-light text-text-base"
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{t('areYouSure')}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="border border-border bg-primary-800 
            duration-300 hover:bg-primary-400"
          >
            {t('cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            className="duration-200 hover:text-primary-900"
            onClick={handleClick}
          >
            {t('continue')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default MenuItemDialog;
