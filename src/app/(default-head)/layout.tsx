import type {Metadata} from "next";
import {getTranslations} from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Home");
  return {
    title: t("title"),
    description: t("description"),
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
export default function DefaultMetaDataLayout({
 children,
}: Readonly<{ children: React.ReactNode }>) {

  return <>{children}</>;
}
