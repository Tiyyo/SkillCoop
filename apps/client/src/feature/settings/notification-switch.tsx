import { Switch } from '../../lib/ui/switch';
import { useApp } from '../../store/app.store';
import capitalize from '../../utils/capitalize';
import { useUpdateNotificationPreference } from '../../hooks/useUserPreference';
import { updateNotificationPreferenceSchema } from '@skillcoop/schema/src';
import { NotificationType } from '@skillcoop/types/src';

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
  const { userId } = useApp();
  const { mutate: updatePreference } = useUpdateNotificationPreference({});

  const handleChangeSwitch = (e: React.FormEvent<HTMLFormElement>) => {
    if (!userId) return null;
    const { checked } = e.target as HTMLInputElement;
    // true = 1
    // false = 0
    const updatePreferenceData = {
      user_id: userId,
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
