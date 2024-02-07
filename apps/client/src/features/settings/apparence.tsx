import { useOutletContext } from 'react-router-dom';
import Container from '../../layouts/container';
import { Switch } from '../../lib/ui/switch';
import { useApp } from '../../stores/app.store';
import { UserPreference, themeAssertion } from '@skillcoop/types/src';
import { useUpdateThemePreference } from '../../hooks/useUserPreference';
import { updateThemePreferenceSchema } from '@skillcoop/schema/src';
import { useTranslation } from 'react-i18next';
import { setDarkTheme, setLightTheme } from '../../utils/set-theme';
import { storeInLocalStorage } from '../../utils/store-in-local';

function ApparenceSettings() {
  const { t } = useTranslation('system');
  const { userId } = useApp();
  const { mutate: updatePreference } = useUpdateThemePreference({});
  const ctx = useOutletContext<UserPreference>();
  if (!ctx) return null;
  // true = light
  // false = dark
  const { prefered_theme: theme } = ctx;

  const handleChangeSwitch = (e: React.FormEvent<HTMLFormElement>) => {
    if (!userId) return null;

    const { checked } = e.target as HTMLInputElement;
    const updateThemeData = {
      name: checked ? themeAssertion.light : themeAssertion.dark,
      user_id: userId,
    };

    const isValid = updateThemePreferenceSchema.safeParse(updateThemeData);

    if (!isValid.success) return null;
    updatePreference(updateThemeData);
    checked ? setLightTheme() : setDarkTheme();
    storeInLocalStorage('_userPreferences', {
      theme: checked ? 'light' : 'dark',
    });
  };

  return (
    <Container className="flex-grow p-5 lg:mt-4">
      <h3 className="py-2 text-sm font-medium">{t('theme')}</h3>
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
