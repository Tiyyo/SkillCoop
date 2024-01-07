import { useOutletContext } from 'react-router-dom';
import Container from '../../layout/container';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../lib/ui/select';
import {
  LanguageSymbol,
  UserPreference,
  languageSymbolToName,
} from 'skillcoop-types';
import { useUpdateLanguagePreference } from '../../hooks/useUserPreference';
import { useApp } from '../../store/app.store';
import { updateLanguagePreferenceSchema } from 'schema/ts-schema';
import toast from '../../utils/toast';
import { useTranslation } from 'react-i18next';
import { storeInLocalStorage } from '../../utils/store-in-local';

function LanguageSettings() {
  const { t, i18n } = useTranslation('system');
  const languageSymbols = Object.keys(languageSymbolToName);
  const languageNames = Object.values(languageSymbolToName);
  const { userProfile } = useApp();
  const { mutate: updatePreference } = useUpdateLanguagePreference({});
  const ctx = useOutletContext<UserPreference>();
  if (!ctx) return null;
  const { prefered_language: language } = ctx;

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const languageSymbol = (e.target as HTMLSelectElement)
      .value as LanguageSymbol;
    i18n.changeLanguage(languageSymbol);
    //update language for language detection module
    localStorage.setItem('i18nextLng', languageSymbol);
    //update userPreferenes object in localStorage
    storeInLocalStorage('_userPreferences', { language: languageSymbol });
    if (!userProfile?.user_id) return;
    const updatePreferenceData = {
      user_id: userProfile.user_id,
      name: languageSymbol,
    };

    const isValid =
      updateLanguagePreferenceSchema.safeParse(updatePreferenceData);
    if (!isValid.success) {
      toast.error(t('couldNotUpdateLanguage'));
    }
    updatePreference(updatePreferenceData);
  };

  return (
    <Container className="lg:mt-4 h-screen p-5">
      <h3 className="font-medium font-sm py-2">{t('language')}</h3>
      <form onChange={handleChange}>
        <Select>
          <SelectTrigger className="w-full max-w-xl">
            <SelectValue
              placeholder={
                language
                  ? t(languageSymbolToName[`${language}`])
                  : t('selectLanguage')
              }
              className="w-12"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {languageSymbols.map((symbol, index) => (
                <SelectItem value={symbol} key={index}>
                  {t(languageNames[index])}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </form>
    </Container>
  );
}

export default LanguageSettings;
