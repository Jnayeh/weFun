"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from "next-themes";

export function ThemeProvider({
  children,
  // TODO: Remove the eslint-disable-next-line comment
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  locale,
  ...props
}: ThemeProviderProps & { locale?: string }) {
  return (
    <NextThemesProvider {...props}>
      {/* <AppProgressBar
        height="6px"
        color="red"
        options={{ showSpinner: false }}
        shallowRouting
      /> */}
      {children}
    </NextThemesProvider>
  );
}
