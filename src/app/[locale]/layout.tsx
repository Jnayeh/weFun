import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";
import { cookies } from "next/headers";
import { ClerkProvider } from "@clerk/nextjs";

import { ThemeProvider } from "~/utils/theme-provider";
import { ResolvingMetadata, Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
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

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <ThemeProvider enableSystem attribute="class">
      <ClerkProvider>
        <TRPCReactProvider cookies={cookies().toString()}>
          {children}
        </TRPCReactProvider>
      </ClerkProvider>
    </ThemeProvider>
  );
}
