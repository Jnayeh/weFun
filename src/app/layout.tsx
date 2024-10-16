import "@/styles/globals.css";

import {marhey, robotoSlab, ubuntu} from "@/assets/fonts";

import {TRPCReactProvider} from "@/trpc/react";
import {getLocale, getMessages} from "next-intl/server";
import {NextIntlClientProvider} from "next-intl";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale}
          className={` ${marhey.variable} ${robotoSlab.variable} ${
            ubuntu.variable
          } scroll-smooth ${
            locale === "ar" ? marhey.className : robotoSlab.className
          }`}>
    <body>
    <NextIntlClientProvider messages={messages}>
      <TRPCReactProvider>
        {children}
      </TRPCReactProvider>
    </NextIntlClientProvider>
    </body>
    </html>
  );
}
