import "~/styles/globals.css";

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
      className={` ${marhey.variable} ${robotoSlab.variable} ${ubuntu.variable} scroll-smooth ${robotoSlab.className}`}
      suppressHydrationWarning
    >
      {children}
    </html>
  );
}
