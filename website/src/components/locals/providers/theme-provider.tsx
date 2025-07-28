"use client";

import { type ComponentProps } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type TProps = ComponentProps<typeof NextThemesProvider> & {};
export default function ThemeProvider({ children, ...props }: TProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
