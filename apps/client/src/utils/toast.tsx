import { BadgeCheck, Send } from 'lucide-react';
import { toast } from 'sonner';

export default {
  success(message: string) {
    toast.success(message, {
      position: 'top-right',
      duration: 2500,
    });
  },
  eventSuccess(message: string, description?: string) {
    toast(message, {
      description: description,

      icon: <BadgeCheck size={24} className="text-primary-600" />,
      position: 'top-right',
      duration: 2500,
    });
  },
  addFriend(message: string) {
    toast(message, {
      icon: <BadgeCheck size={24} className="text-primary-600" />,
      position: 'top-right',
      duration: 2500,
    });
  },
  invitationSent(message: string) {
    toast(message, {
      icon: <Send size={24} className="text-primary-600" />,
      position: 'top-right',
      duration: 2000,
    });
  },
  emailSent(email: string) {
    toast(email, {
      icon: <Send size={24} className="text-primary-600" />,
      position: 'top-right',
      duration: 2000,
    });
  },
  error(message: string) {
    toast.error(message, {
      position: 'top-right',
      duration: 2500,
    });
  },
};
