import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";
import { cookies } from "next/headers";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("~/components/Footer/footer.component"), {
  ssr: true,
});
const Navbar = dynamic(() => import("~/components/Navbar/navbar.component"), {
  ssr: true,
});
import { LoginSideBar } from "~/components/Sidebar";
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
          <div className="flex h-screen flex-col justify-between">
            <div>
              <Navbar />
              <Suspense>
                <LoginSideBar side="left" className="md:hidden" />
                <LoginSideBar side="right" className="hidden md:block" />
              </Suspense>
              {children}
            </div>
            <Suspense>
              <Footer />
            </Suspense>
          </div>
        </TRPCReactProvider>
      </ClerkProvider>
    </ThemeProvider>
  );
}
