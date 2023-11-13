import { BadgeCheck, Send } from 'lucide-react';
import { toast } from 'sonner';

export default {
  eventSuccess(message: string, description?: string) {
    toast(message, {
      description: description,

      icon: (
        <BadgeCheck
          size={24}
          className="text-primary-600"
        />
      ),
      position: 'top-right',
      duration: 2500,
    });
  },
  addFriend(username: string) {
    toast(`${username} has been added to your friend list`, {
      icon: (
        <BadgeCheck
          size={24}
          className="text-primary-600"
        />
      ),
      position: 'top-right',
      duration: 2500,
    });
  },
  invitationSent(username?: string) {
    const message = username
      ? `Invitation sent to ${username}`
      : `Invitation sent`;
    toast(message, {
      icon: (
        <Send
          size={24}
          className="text-primary-600"
        />
      ),
      position: 'top-right',
      duration: 2000,
    });
  },
  error(message: string) {
    toast.error(message);
  },
  // success(message: string) {
  //   toast.success(message, {
  //     position: toast.POSITION.TOP_LEFT,
  //     autoClose: 1500,
  //     theme: "light",
  //   })
  // },
  // error(message: string) {
  //   toast.error(message, {
  //     position: toast.POSITION.TOP_LEFT,
  //     autoClose: 2500,
  //     theme: "light",
  //   })
  // },
  // info(message: string) {
  //   toast.info(message, {
  //     position: toast.POSITION.TOP_LEFT,
  //     autoClose: 1500,
  //     theme: "light",
  //   })
  // }
};
