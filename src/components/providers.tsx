"use client";

import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import esMessages from "@/i18n/messages/es.json";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <NextIntlClientProvider locale="es" messages={esMessages}>
      {children}
    </NextIntlClientProvider>
  );
}
