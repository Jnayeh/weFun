export type Locale = (typeof locales)[number];

export const locales = ['en', 'fr','ar','ar-tn'] as const;
export const defaultLocale: Locale = 'ar-tn';