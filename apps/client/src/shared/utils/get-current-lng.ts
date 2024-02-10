export const getCurrentLngInLocalStorage = (): string | undefined => {
  const currentLng = localStorage.getItem('i18nextLng');
  if (currentLng) return currentLng.slice(0, 2);

  try {
    const userPreferencesStringify = localStorage.getItem('_userPreferences');
    if (!userPreferencesStringify) return;
    const userPreferences = JSON.parse(userPreferencesStringify);
    if (userPreferences?.language) {
      return userPreferences.language;
    }
    return;
  } catch (error) {
    console.error(error, 'Error parsing userPreferences in Json');
    return;
  }
};
