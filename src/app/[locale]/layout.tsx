import "~/styles/globals.css";
import { TRPCReactProvider } from "~/trpc/react";
import { cookies } from "next/headers";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("~/components/Footer/footer.component"), {
  ssr: true,
});
const Navbar = dynamic(() => import("~/components/Navbar/navbar.component"), {
  ssr: true,
});
import { LoginSideBar } from "~/components/Sidebar";
import { ThemeProvider } from "~/utils/theme-provider";

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-900 dark:text-white">
        <ThemeProvider enableSystem attribute="class">
          <ClerkProvider>
            <TRPCReactProvider cookies={cookies().toString()}>
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
            </TRPCReactProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
