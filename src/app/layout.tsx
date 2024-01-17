import "~/styles/globals.css";
import { ThemeProvider } from "~/utils/theme-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-900 dark:text-white">
        <ThemeProvider enableSystem attribute="class">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
