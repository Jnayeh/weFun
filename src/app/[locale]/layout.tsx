import { TRPCReactProvider } from "~/trpc/react";
import { cookies } from "next/headers";
import { ClerkProvider } from "@clerk/nextjs";

import { ThemeProvider } from "~/utils/theme-provider";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {marhey, robotoSlab, ubuntu} from "~/Assets/fonts";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Home");
  return {
    title: t("title"),
    description: "Stop existing & Start living",
    icons: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
      },
      {
        rel: "apple-touch-icon",
        url: "/favicon.png",
        type: "image/png",
      },
    ],
  };
}

function directionByLang(locale: string) {
  switch (locale) {
    case "ar":
    case "ar-tn":
      return "rtl";
    default:
      return "ltr";
  }
}

export default function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html
      className={` ${marhey.variable} ${robotoSlab.variable} ${
        ubuntu.variable
      } scroll-smooth ${
        locale === "ar" ? marhey.className : robotoSlab.className
      }`}
      dir={directionByLang(locale)}
      suppressHydrationWarning
      lang={locale}
    >
      <body className="min-h-screen bg-white dark:bg-gray-900 dark:text-white">
        <ThemeProvider enableSystem attribute="class" locale={locale}>
          <ClerkProvider>
            <TRPCReactProvider cookies={cookies().toString()}>
              {children}
            </TRPCReactProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
