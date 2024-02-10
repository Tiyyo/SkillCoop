export const storeInLocalStorage = (
  objectKey: string,
  value: Record<string, unknown>,
) => {
  // check if userPreference object exist in local storage
  //  if not, create one
  //  if yes, update the value

  const userPreferences = localStorage.getItem(objectKey);

  if (!userPreferences) {
    localStorage.setItem(objectKey, JSON.stringify(value));
  } else {
    const parsedUserPreferences = JSON.parse(userPreferences);
    const updatedUserPreferences = { ...parsedUserPreferences, ...value };
    localStorage.setItem(objectKey, JSON.stringify(updatedUserPreferences));
  }
};
