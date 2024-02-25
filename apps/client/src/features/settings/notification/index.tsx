import { useOutletContext } from 'react-router-dom';
import Container from '../../../shared/layouts/container';
import {
  NotificationMethodSetting,
  UserPreference,
} from '@skillcoop/types/src';
import NotificationSetting from './setting';
import { useTranslation } from 'react-i18next';

type NotificationMethodSettings = Record<string, NotificationMethodSetting>;

function NotificationsSettings() {
  const { t } = useTranslation('system');
  const ctx = useOutletContext<UserPreference>();
  if (!ctx) return null;
  const { prefered_notifications } = ctx;

  const userNotificationSetting: NotificationMethodSettings =
    prefered_notifications.reduce((acc, curr) => {
      return { ...acc, [curr.type_name]: curr };
    }, {});

  return (
    <Container className="flex-grow p-5 lg:mt-4">
      <NotificationSetting
        type="event"
        label={t('event')}
        settings={userNotificationSetting.event}
        legend={t('eventNotificationLegend')}
      />
      <NotificationSetting
        type="friend"
        label={t('friends')}
        settings={userNotificationSetting.friend}
        legend={t('friendsNotificationLegend')}
      />
      <NotificationSetting
        type="message"
        label={t('messages')}
        settings={userNotificationSetting.message}
        legend={t('messagesNotificationLegend')}
      />
      <NotificationSetting
        type="system"
        label={t('system')}
        settings={userNotificationSetting.system}
        legend={t('systemNotificationLegend')}
      />
    </Container>
  );
}

export default NotificationsSettings;
