
import { lazy } from "react";
const Footer = lazy(() =>
  import("~/components/Footer/footer.component").then((res) => ({
    default: res.default,
  }))
);
import Navbar from "~/components/Navbar/navbar.component";

interface LayoutProps {
  children: React.ReactNode;
  navBarClass?: string
}

const Layout: React.FC<LayoutProps> = ({ children, navBarClass }) => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
      <Navbar navBarClass={navBarClass}/>
      {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
