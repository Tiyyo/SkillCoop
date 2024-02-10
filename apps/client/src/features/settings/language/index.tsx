import { useOutletContext } from 'react-router-dom';
import Container from '../../../shared/layouts/container';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../lib/ui/select';
import {
  LanguageSymbol,
  UserPreference,
  languageSymbolToName,
} from '@skillcoop/types/src';
import { useUpdateLanguagePreference } from '../hooks/useUserPreference';
import { useApp } from '../../../shared/store/app.store';
import { updateLanguagePreferenceSchema } from '@skillcoop/schema/src';
import toast from '../../../shared/utils/toast';
import { useTranslation } from 'react-i18next';
import { storeInLocalStorage } from '../../../shared/utils/store-in-local';

function LanguageSettings() {
  const { t, i18n } = useTranslation('system');
  const languageSymbols = Object.keys(languageSymbolToName);
  const languageNames = Object.values(languageSymbolToName);
  const { userId } = useApp();
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

    if (!userId) return;
    const updatePreferenceData = {
      user_id: userId,
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
    <Container className="h-screen p-5 lg:mt-4">
      <h3 className="font-sm py-2 font-medium">{t('language')}</h3>
      <form onChange={handleChange}>
        <Select>
          <SelectTrigger
            className="w-full max-w-xl border-border 
          focus:ring-primary-700"
          >
            <SelectValue
              placeholder={
                language
                  ? t(languageSymbolToName[`${language}`])
                  : t('selectLanguage')
              }
              className="w-12"
            />
          </SelectTrigger>
          <SelectContent className="text-text-base">
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
