"use client"

import { DefaultSeo } from "next-seo"
import { ReactNode, useMemo } from "react"
import { AppThemeProvider } from "@/providers/theme-provider"
import { PlaceholderIntlProvider } from "@/providers/intl-provider"
import seoConfig from "@/config/seo"
import { Toaster } from "@/components/ui/sonner"

type AppProvidersProps = {
  children: ReactNode
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  const messages = useMemo(() => ({}), [])

  return (
    <AppThemeProvider>
      <PlaceholderIntlProvider locale="en" messages={messages}>
        <DefaultSeo {...seoConfig} />
        {children}
        <Toaster richColors closeButton position="bottom-center" />
      </PlaceholderIntlProvider>
    </AppThemeProvider>
  )
}
