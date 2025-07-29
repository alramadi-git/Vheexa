import "@/app/globals.css";

import { cn } from "@/utilities/cn";
import { Zain } from "next/font/google";
import { type PropsWithChildren } from "react";
import { ENVIRONMENT } from "@/enums/environment";
import { NextIntlClientProvider } from "next-intl";
import { TooltipProvider } from "@/components/shadcn/tooltip";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import ThemeProvider from "@/components/locals/providers/theme-provider";
import { TParamsLocale } from "@/types/params";

type TGenerateMetadataProps = TParamsLocale & {};
type TRootLayoutProps = TParamsLocale & PropsWithChildren & {};

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
export async function generateMetadata(props: TGenerateMetadataProps) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "app" });

  return t.raw("metadata");
}

export default async function RootLayout(props: TRootLayoutProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const [t, messages] = await Promise.all([
    getTranslations("app.page"),
    getMessages({ locale }),
  ]);

  return (
    <html suppressHydrationWarning dir={t("dir")} lang={t("lang")}>
      <body className={cn(zain.className, "antialiased")}>
        <ThemeProvider
          enableSystem
          disableTransitionOnChange
          attribute="class"
          defaultTheme="system"
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <TooltipProvider>{props.children}</TooltipProvider>
          </NextIntlClientProvider>
        </ThemeProvider>

        {(process.env.NODE_ENV === ENVIRONMENT.DEVELOPMENT ||
          process.env.NODE_ENV === ENVIRONMENT.TEST) && (
          <script
            defer
            src="https://unpkg.com/react-scan/dist/auto.global.js"
          />
        )}
      </body>
    </html>
  );
}
