import { CheckCircle, Loader } from 'lucide-react';
import { cn } from '../../lib/utils';
import { InvitationStatus } from '../../types';

interface StatusProps {
  status: InvitationStatus;
  className?: string;
}

function Status({ status, className }: StatusProps) {
  if (status === 'confirmed') {
    return (
      <div
        className={cn(
          'text-light text-xxs flex items-center gap-x-1 py-1',
          className,
        )}
      >
        <p className="">Confirmed</p>
        <CheckCircle size={10} />
      </div>
    );
  }
  if (status === 'pending') {
    return (
      <div
        className={cn(
          'text-light text-xxs flex items-center gap-x-1 py-1',
          className,
        )}
      >
        <p className="">Pending</p>
        <Loader size={10} />
      </div>
    );
  }
}

export default Status;
