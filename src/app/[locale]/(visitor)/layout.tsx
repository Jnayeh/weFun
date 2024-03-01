import { Suspense } from "react";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("~/components/navigation/navbar"), {
  ssr: true,
});
import { LoginSideBar } from "~/components/Sidebar";
import BottomNav from "~/components/navigation/bottom-nav";
import { unstable_setRequestLocale } from "next-intl/server";
import { locales } from "~/navigation";
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
  unstable_setRequestLocale(locale);
  return (
    <div className="flex h-screen flex-col justify-between">
      <div>
        <Navbar />
        <BottomNav />
        <Suspense>
          <LoginSideBar />
        </Suspense>
        {children}
      </div>
    </div>
  );
}
