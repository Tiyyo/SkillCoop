import { Switch } from '../../lib/ui/switch';
import { useApp } from '../../store/app.store';
import capitalize from '../../utils/capitalize';
import { useUpdateNotificationPreference } from '../../hooks/useUserPreference';
import { updateNotificationPreferenceSchema } from 'schema/ts-schema';
import { NotificationType } from 'skillcoop-types';

type NotificationSwitchProps = {
  notificationType: NotificationType;
  method: string;
  value: boolean;
};

function NotificationSwitch({
  notificationType,
  method,
  value,
}: NotificationSwitchProps) {
  const { userProfile } = useApp();
  const { mutate: updatePreference } = useUpdateNotificationPreference({});

  const handleChangeSwitch = (e: React.FormEvent<HTMLFormElement>) => {
    if (!userProfile?.user_id) return null;
    const { checked } = e.target as HTMLInputElement;
    // true = 1
    // false = 0
    const updatePreferenceData = {
      user_id: userProfile.user_id,
      type_name: notificationType,
      [method]: checked,
    };
    const isValid =
      updateNotificationPreferenceSchema.safeParse(updatePreferenceData);
    if (!isValid.success) return null;
    updatePreference(updatePreferenceData);
  };
  return (
    <form
      className="flex justify-end w-full gap-2 py-2"
      onChange={handleChangeSwitch}
    >
      <span className="text-xs">{capitalize(method)}</span>
      <Switch name={`${notificationType}_${method}`} defaultChecked={value} />
    </form>
  );
}

export default NotificationSwitch;
