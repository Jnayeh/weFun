import { AppProps, type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import "~/styles/navbar.styles.css";
import { ThemeProvider } from "~/utils/theme-provider";
import { NextPage } from "next";
import { NextIntlClientProvider } from "next-intl";
import { ClerkProvider } from "@clerk/nextjs";
import "nprogress/nprogress.css";
import { progressBar } from "~/utils/utils";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};
type WithLayoutProps = AppProps & {
  Component: NextPageWithLayout;
};
const MyApp: AppType = ({ Component, pageProps, router }: WithLayoutProps) => {
  // Use getLayout function if it's defined in the Component
  const getLayout = Component.getLayout || ((page: React.ReactNode) => page);
  // Adds progress bar
  progressBar();
  return (
    <ClerkProvider {...pageProps}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <NextIntlClientProvider
          messages={pageProps.messages}
          locale={router.locale}
          timeZone="Africa/Tunis"
        >
          {getLayout(<Component {...pageProps} key={router.asPath} />)}
        </NextIntlClientProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
