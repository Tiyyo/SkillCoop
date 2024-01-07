import { useOutletContext } from 'react-router-dom';
import Container from '../../layout/container';
import { Switch } from '../../lib/ui/switch';
import { useApp } from '../../store/app.store';
import { UserPreference, themeAssertion } from 'skillcoop-types';
import { useUpdateThemePreference } from '../../hooks/useUserPreference';
import { updateThemePreferenceSchema } from 'schema/ts-schema';
import { useTranslation } from 'react-i18next';

function ApparenceSettings() {
  const { t } = useTranslation('system');
  const { userProfile } = useApp();
  const { mutate: updatePreference } = useUpdateThemePreference({});
  const ctx = useOutletContext<UserPreference>();
  if (!ctx) return null;
  // true = light
  // false = dark
  const { prefered_theme: theme } = ctx;

  const handleChangeSwitch = (e: React.FormEvent<HTMLFormElement>) => {
    if (!userProfile?.user_id) return null;

    const { checked } = e.target as HTMLInputElement;
    const updateThemeData = {
      name: checked ? themeAssertion.light : themeAssertion.dark,
      user_id: userProfile?.user_id,
    };

    const isValid = updateThemePreferenceSchema.safeParse(updateThemeData);

    if (!isValid.success) return null;
    updatePreference(updateThemeData);
  };
  return (
    <Container className="lg:mt-4 flex-grow p-5">
      <h3 className="font-medium text-sm py-2">{t('theme')}</h3>
      <form
        className="flex items-center justify-end gap-3"
        onChange={handleChangeSwitch}
      >
        <span className="text-xs">{t('dark')}</span>
        <Switch defaultChecked={theme === 'light' ? true : false} />
        <span className="text-xs">{t('light')}</span>
      </form>
    </Container>
  );
}

export default ApparenceSettings;
