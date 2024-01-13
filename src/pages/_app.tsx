import { AppProps, type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import "~/styles/navbar.styles.css";
import { ThemeProvider } from "~/utils/theme-provider";
import { NextPage } from "next";
import { NextIntlProvider } from "next-intl";
import { ClerkProvider } from "@clerk/nextjs";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};
type WithLayoutProps = AppProps & {
  Component: NextPageWithLayout;
};
const MyApp: AppType = ({ Component, pageProps, router }: WithLayoutProps) => {
  // Use getLayout function if it's defined in the Component
  const getLayout = Component.getLayout || ((page: React.ReactNode) => page);
  return (
    <ClerkProvider {...pageProps}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NextIntlProvider messages={pageProps.messages}>
            {getLayout(<Component {...pageProps} key={router.asPath} />)}
        </NextIntlProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
