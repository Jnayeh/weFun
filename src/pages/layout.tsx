import Link from "next/link";
import { lazy, useState } from "react";
const Footer = lazy(() =>
  import("~/components/Footer/footer.component").then((res) => ({
    default: res.default,
  }))
);
import Navbar from "~/components/Navbar/navbar.component";
import { LoginSideBar } from "~/components/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  navBarClass?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, navBarClass }) => {
  return (
    <div className="flex h-screen flex-col justify-between">
    <LoginSideBar side="left" className="md:hidden"/>
    <LoginSideBar side="right" className="hidden md:block"/>
      <div>
        <Navbar navBarClass={navBarClass} />
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
