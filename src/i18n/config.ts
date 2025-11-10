export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export async function getMessages(locale: Locale = defaultLocale) {
  if (locale === "en") {
    return (await import("./messages/en.json")).default;
  }

  return (await import("./messages/es.json")).default;
}
