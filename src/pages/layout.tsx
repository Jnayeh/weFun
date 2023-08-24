
import { lazy } from "react";
const Footer = lazy(() =>
  import("~/components/Footer/footer.component").then((res) => ({
    default: res.default,
  }))
);
import Navbar from "~/components/Navbar/navbar.component";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div className="pb-[60px]">
      <Navbar />
      </div>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
