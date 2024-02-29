import { NotificationType } from "."

export type Theme = 'light' | 'dark'

export type LanguageSymbol = 'en' | 'es' | 'fr'

export const languageNameToSymbol = {
  english: 'en',
  spanish: 'es',
  french: 'fr',
} as const

export const languageSymbolToName = {
  en: 'english',
  es: 'spanish',
  fr: 'french',
} as const

export const themeAssertion = {
  light: 'light',
  dark: 'dark',
} as const

export type NotificationPreference = {
  type_name: NotificationType
  email: boolean
  push: boolean
  website: boolean
}

export type UserPreference = {
  prefered_theme: Theme
  prefered_language: LanguageSymbol
  prefered_notifications: NotificationPreference[]
}

export type RawUserPreference = {
  prefered_theme: Theme
  prefered_language: LanguageSymbol
  prefered_notifications: string
}

export type UpdateNotificationPreference = {
  user_id: string
  type_name: NotificationType
  push?: boolean
  website?: boolean
  email?: boolean
}

export type NotificationMethodSetting = {
  type_name: string;
  email: boolean;
  website: boolean;
  push: boolean;
}

export type UpdateLanguagePreference = {
  user_id: string
  name: LanguageSymbol
}

export type UpdateThemePreference = {
  user_id: string
  name: Theme
}