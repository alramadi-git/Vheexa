"use client";
import { type ComponentProps } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

interface IProps extends ComponentProps<typeof NextThemesProvider> {}
export default function ThemeProvider({ children, ...props }: IProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
