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
  if (typeof window !== "undefined" && locale)
    window.document.documentElement.lang = locale;
  return (
    <NextThemesProvider {...props}>
      <AppProgressBar
        height="8px"
        color="#E60000"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </NextThemesProvider>
  );
}
