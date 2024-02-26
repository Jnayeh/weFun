"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { AppProgressBar } from "next-nprogress-bar";

export function ThemeProvider({
  children,
  locale,
  ...props
}: ThemeProviderProps & { locale?: string }) {
  return (
    <body
      className="min-h-screen bg-white dark:bg-gray-900 dark:text-white"
      lang={locale}
    >
      <NextThemesProvider {...props}>
        <AppProgressBar
          height="6px"
          color="red"
          options={{ showSpinner: false }}
          shallowRouting
        />
        {children}
      </NextThemesProvider>
    </body>
  );
}
