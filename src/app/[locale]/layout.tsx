import { TRPCReactProvider } from "~/trpc/react";
import { cookies } from "next/headers";
import { ClerkProvider } from "@clerk/nextjs";

import { ThemeProvider } from "~/utils/theme-provider";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Marhey, Roboto_Slab, Ubuntu } from "next/font/google";
import { locales } from "~/navigation";
const marhey = Marhey({
  subsets: ["arabic"],
  variable: "--font-marhey",
  display: "swap",
});
const robotoSlab = Roboto_Slab({
  subsets: ["latin", "latin-ext"],
  variable: "--font-roboto-slab",
  display: "swap",
});
export const ubuntu = Ubuntu({
  subsets: ["latin", "latin-ext"],
  variable: "--font-ubuntu",
  display: "swap",
  weight: ["300", "400", "500", "700"],
});
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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html
      className={` ${marhey.variable} ${robotoSlab.variable} ${ubuntu.variable} scroll-smooth ${robotoSlab.className}`}
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
