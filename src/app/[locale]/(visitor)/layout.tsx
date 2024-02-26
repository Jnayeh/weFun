import { Suspense } from "react";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("~/components/Footer/footer.component"), {
  ssr: true,
});
const Navbar = dynamic(() => import("~/components/Navbar/navbar.component"), {
  ssr: true,
});
import { LoginSideBar } from "~/components/Sidebar";
import BottomNav from "~/components/Navbar/bottom-nav";

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <Suspense>
        <Footer />
      </Suspense>
    </div>
  );
}
