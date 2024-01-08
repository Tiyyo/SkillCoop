import { useOutletContext } from 'react-router-dom';
import Container from '../../layout/container';
import { NotificationMethodSetting, UserPreference } from '@skillcoop/types';
import NotificationSetting from './notification-setting';

type NotificationMethodSettings = Record<string, NotificationMethodSetting>;

function NotificationsSettings() {
  const ctx = useOutletContext<UserPreference>();
  if (!ctx) return null;
  const { prefered_notifications } = ctx;

  const userNotificationSetting: NotificationMethodSettings =
    prefered_notifications.reduce((acc, curr) => {
      return { ...acc, [curr.type_name]: curr };
    }, {});

  return (
    <Container className="lg:mt-4 p-5">
      <NotificationSetting
        type="event"
        settings={userNotificationSetting.event}
        legend="Manage how you receive alerts about important 
        events you attending"
      />
      <NotificationSetting
        type="friend"
        settings={userNotificationSetting.friend}
        legend="Manage your alerts for interactions with your contacts."
      />
      <NotificationSetting
        type="message"
        settings={userNotificationSetting.message}
        legend="Manage how you receive notifications for new messages."
      />
      <NotificationSetting
        type="system"
        settings={userNotificationSetting.system}
        legend="Manage how you stay updated with essential 
        system updates and announcements"
      />
    </Container>
  );
}

export default NotificationsSettings;
