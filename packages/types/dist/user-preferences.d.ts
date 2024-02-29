import { NotificationType } from ".";
export type Theme = 'light' | 'dark';
export type LanguageSymbol = 'en' | 'es' | 'fr';
export declare const languageNameToSymbol: {
    readonly english: "en";
    readonly spanish: "es";
    readonly french: "fr";
};
export declare const languageSymbolToName: {
    readonly en: "english";
    readonly es: "spanish";
    readonly fr: "french";
};
export declare const themeAssertion: {
    readonly light: "light";
    readonly dark: "dark";
};
export type NotificationPreference = {
    type_name: NotificationType;
    email: boolean;
    push: boolean;
    website: boolean;
};
export type UserPreference = {
    prefered_theme: Theme;
    prefered_language: LanguageSymbol;
    prefered_notifications: NotificationPreference[];
};
export type RawUserPreference = {
    prefered_theme: Theme;
    prefered_language: LanguageSymbol;
    prefered_notifications: string;
};
export type UpdateNotificationPreference = {
    user_id: string;
    type_name: NotificationType;
    push?: boolean;
    website?: boolean;
    email?: boolean;
};
export type NotificationMethodSetting = {
    type_name: string;
    email: boolean;
    website: boolean;
    push: boolean;
};
export type UpdateLanguagePreference = {
    user_id: string;
    name: LanguageSymbol;
};
export type UpdateThemePreference = {
    user_id: string;
    name: Theme;
};
