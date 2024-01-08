import {
  NotificationMethodSetting,
  NotificationType,
} from '@skillcoop/types/src';
import capitalize from '../../utils/capitalize';
import NotificationSwitch from './notification-switch';

type NotificationSettingProps = {
  type: NotificationType;
  settings: NotificationMethodSetting;
  legend?: string;
};

function NotificationSetting({
  type,
  settings,
  legend,
}: NotificationSettingProps) {
  return (
    <>
      <h3 className="font-semibold text-sm py-1">{capitalize(type)}</h3>
      <p className="font-light text-xs">{legend}</p>
      <NotificationSwitch
        notificationType={type}
        method="email"
        value={settings['email']}
      />
      <NotificationSwitch
        notificationType={type}
        method="website"
        value={settings['website']}
      />
      <NotificationSwitch
        notificationType={type}
        method="push"
        value={settings['push']}
      />
    </>
  );
}

export default NotificationSetting;
