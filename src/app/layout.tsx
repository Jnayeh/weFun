import "@/styles/globals.css";

import {marhey, robotoSlab, ubuntu} from "@/assets/fonts";

import {TRPCReactProvider} from "@/trpc/react";
import {getLocale, getMessages} from "next-intl/server";
import {NextIntlClientProvider} from "next-intl";
import {ThemeProvider} from "@/app/theme-provider";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale}
          suppressHydrationWarning
          className={` ${marhey.variable} ${robotoSlab.variable} ${
            ubuntu.variable
          } scroll-smooth ${
            locale === "ar" ? marhey.className : robotoSlab.className
          }`}>
    <body>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
    <NextIntlClientProvider messages={messages}>
      <TRPCReactProvider>
          {children}
      </TRPCReactProvider>
    </NextIntlClientProvider>
</ThemeProvider>
    </body>
    </html>
  );
}
