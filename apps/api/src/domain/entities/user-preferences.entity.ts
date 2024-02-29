type NotificationPreference = {
  type_name: string;
  email: boolean;
  push: boolean;
  website: boolean;
};

export interface UserPreferences {
  prefered_notifications: NotificationPreference[];
  prefered_theme: 'light' | 'dark';
  prefered_language: string;
}
