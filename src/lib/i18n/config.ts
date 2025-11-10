export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export const messages = {
  es: {
    greeting: "Hola",
  },
  en: {
    greeting: "Hello",
  },
};

export const I18N_NOTE =
  "Stub de i18n: Integra next-intl conectando estos recursos cuando se definan las traducciones oficiales.";
