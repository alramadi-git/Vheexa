import "@/app/globals.css";

import { TooltipProvider } from "@/components/shadcn/tooltip";
import ThemeProvider from "@/components/locals/providers/theme-provider";
import { ENVIRONMENT_MODE } from "@/enums";
import { cn } from "@/utilities";
import { Zain } from "next/font/google";
import { getTranslations } from "next-intl/server";
import { type ReactNode } from "react";

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

export async function generateMetadata() {
  const t = await getTranslations("app.metadata");

  return t.raw("");
}

export default async function RootLayout(props: Readonly<IProps>) {
  const t = await getTranslations("app.page");

  return (
    <html lang={t("lang")} suppressHydrationWarning>
      <body className={cn(zain.className, "antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{props.children}</TooltipProvider>
        </ThemeProvider>

        {(process.env.NODE_ENV === ENVIRONMENT_MODE.DEVELOPMENT ||
          process.env.NODE_ENV === ENVIRONMENT_MODE.TEST) && (
          <script
            defer
            src="https://unpkg.com/react-scan/dist/auto.global.js"
          />
        )}
      </body>
    </html>
  );
}
