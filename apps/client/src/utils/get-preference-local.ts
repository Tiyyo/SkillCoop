// check if a particular setting exist
// in a userPreference object in local storage

export const getPreferenceFromLocalStorage = (settingKey: string) => {
  const userPreferences = localStorage.getItem('_userPreferences');
  if (!userPreferences) return null;

  const parsedUserPreferences = JSON.parse(userPreferences);
  if (!parsedUserPreferences[settingKey]) return null;

  return parsedUserPreferences[settingKey];
};
