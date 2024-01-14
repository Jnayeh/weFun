
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Footer = dynamic(() => import("~/components/Footer/footer.component"), {
  ssr: false,
});
import Navbar from "~/components/Navbar/navbar.component";
const LoginSideBar = dynamic(
  () => import("~/components/Sidebar").then((module) => module.LoginSideBar),
  {
    ssr: false,
  }
);
interface LayoutProps {
  children: React.ReactNode;
  navBarClass?: string;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
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
  );
};

export default Layout;
