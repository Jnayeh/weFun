import dynamic from "next/dynamic";
import BottomNav from "~/components/navigation/bottom-nav";
import {unstable_setRequestLocale} from "next-intl/server";
import {locales} from "~/navigation";
import {Suspense} from "react";

const Navbar = dynamic(() => import("~/components/navigation/navbar"), {
  ssr: true,
});

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  unstable_setRequestLocale(locale);
  return (
    <div className="flex h-screen flex-col justify-between">
      <div>
        <Suspense>
          <Navbar/>
          <BottomNav/>
        </Suspense>
        {children}
      </div>
    </div>
  );
}
