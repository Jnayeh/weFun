"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { AppProgressBar } from "next-nprogress-bar";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <AppProgressBar
        height="4px"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </NextThemesProvider>
  );
}
