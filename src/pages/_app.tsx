import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import "~/styles/navbar.styles.css";
import "~/styles/footer.styles.css";
import { useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { useTheme } from "next-themes";
import Layout from "./layout";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const { setTheme } = useTheme();

  useEffect(() => {
    // Apply the saved theme on initial load
    setTheme(localStorage.getItem("theme") || "light");
  }, []);

  // Use getLayout function if it's defined in the Component
  const getLayout = Component.getLayout || ((page: React.ReactNode) => page);
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {getLayout(
          <Component {...pageProps} />
        )}
    </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
