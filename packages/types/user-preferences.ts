import { NotificationType } from "."

export type NotificationPreference = {
  type_name: NotificationType
  email: boolean
  push: boolean
  website: boolean
}

export type UserPreference = {
  prefered_theme: 'light' | 'dark'
  prefered_language: 'en' | 'fr' | 'es'
  prefered_notifications: NotificationPreference[]
}

export type RawUserPreference = {
  prefered_theme: 'light' | 'dark'
  prefered_language: 'en' | 'fr' | 'es'
  prefered_notifications: string
}