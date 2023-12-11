import { motion } from "framer-motion";
import { useRouter } from "next/router";
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
  const router = useRouter();
  return (
    <div className="flex h-screen flex-col justify-between">
      <div>
        <Navbar />
        <LoginSideBar side="left" className="md:hidden" />
        <LoginSideBar side="right" className="hidden md:block" />
        <motion.div
          key={router.asPath}
          initial={{ x: "100%", opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 160,
            damping: 16,
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
