import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import {getLocale, getMessages} from "next-intl/server";
import {NextIntlClientProvider} from "next-intl";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale} className={`${GeistSans.variable}`}>
      <body>
      <NextIntlClientProvider messages={messages}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </NextIntlClientProvider>

      </body>
    </html>
  );
}
