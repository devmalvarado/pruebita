"use client"

import { NextIntlClientProvider } from "next-intl"
import { ReactNode } from "react"

type PlaceholderIntlProviderProps = {
  children: ReactNode
  locale: string
  messages?: Record<string, string>
}

/**
 * Minimal next-intl scaffold so the app can be internationalized later.
 * Currently it just forwards children with the provided locale and messages.
 */
export const PlaceholderIntlProvider = ({
  children,
  locale,
  messages = {},
}: PlaceholderIntlProviderProps) => {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
