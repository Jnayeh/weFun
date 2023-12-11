import { motion } from "framer-motion";
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

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen flex-col justify-between">
      <div>
        <Navbar />
        <LoginSideBar side="left" className="md:hidden" />
        <LoginSideBar side="right" className="hidden md:block" />
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          {children}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
