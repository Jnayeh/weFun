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
    <NextThemesProvider {...props}>
      <AppProgressBar
        height="6px"
        color="red"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </NextThemesProvider>
  );
}
