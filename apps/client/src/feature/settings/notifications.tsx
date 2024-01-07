import { useOutletContext } from 'react-router-dom';
import Container from '../../layout/container';
import { NotificationMethodSetting, UserPreference } from 'skillcoop-types';
import NotificationSetting from './notification-setting';
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
    <Container className="lg:mt-4 p-5">
      <NotificationSetting
        type={t('event')}
        settings={userNotificationSetting.event}
        legend={t('eventNotificationLegend')}
      />
      <NotificationSetting
        type={t('friends')}
        settings={userNotificationSetting.friend}
        legend={t('friendsNotificationLegend')}
      />
      <NotificationSetting
        type={t('messages')}
        settings={userNotificationSetting.message}
        legend={t('messagesNotificationLegend')}
      />
      <NotificationSetting
        type={t('system')}
        settings={userNotificationSetting.system}
        legend={t('systemNotificationLegend')}
      />
    </Container>
  );
}

export default NotificationsSettings;
