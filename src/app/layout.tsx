import "~/styles/globals.css";
import { ThemeProvider } from "~/utils/theme-provider";

import { Marhey, Roboto_Slab, Ubuntu } from "next/font/google";
const marhey = Marhey({
  subsets: ["arabic"],
  variable: "--font-marhey",
  display: "swap",
});
const robotoSlab = Roboto_Slab({
  subsets: ["latin", "latin-ext"],
  variable: "--font-roboto-slab",
  display: "swap",
});
export const ubuntu = Ubuntu({
  subsets: ["latin", "latin-ext"],
  variable: "--font-ubuntu",
  display: "swap",
  weight: ["300", "400", "500", "700"],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      style={robotoSlab.style}
      className={` ${marhey.variable} ${robotoSlab.variable} ${ubuntu.variable} scroll-smooth `}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-white dark:bg-gray-900 dark:text-white">
        <ThemeProvider enableSystem attribute="class">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
