import "@/app/globals.css";

import { Zain } from "next/font/google";

import type { ReactNode } from "react";
import { ThemeProvider } from "@/app/_components/locals/providers/Theme";
import { TooltipProvider } from "@/app/_components/shadcn/tooltip";

interface IProps {
  children: ReactNode;
}

const zain = Zain({
  adjustFontFallback: true,
  preload: true,
  display: "swap",
  style: ["normal"],
  subsets: ["latin"],
  fallback: ["Segoe UI", "sans-serif"],
  weight: ["200", "300", "400", "700", "800", "900"],
});

export const dynamic = "force-static";
export const metadata = {
  title: {
    default: "Vheexa",
    absolute: "Vheexa",
    template: "%s | Vheexa",
  },

  authors: [
    {
      name: "alramadi",
      url: "https://www.alramadi.com",
    },
  ],
};

export default function RootLayout(props: Readonly<IProps>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${zain.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{props.children}</TooltipProvider>
        </ThemeProvider>

        {(process.env.NODE_ENV === "development" ||
          process.env.NODE_ENV === "test") && (
          <script
            defer
            src="https://unpkg.com/react-scan/dist/auto.global.js"
          />
        )}
      </body>
    </html>
  );
}
