import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppProps, type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import "~/styles/navbar.styles.css";
import "~/styles/footer.styles.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NextPage } from "next";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};
type WithLayoutProps = AppProps & {
  Component: NextPageWithLayout;
};
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps,
}: WithLayoutProps) => {
  // Use getLayout function if it's defined in the Component
  const getLayout = Component.getLayout || ((page: React.ReactNode) => page);
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
