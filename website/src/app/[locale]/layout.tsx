import "@/app/globals.css";

import { ENVIRONMENT } from "@/enums/environment";

import type { Metadata } from "next";
import type { TLayoutMetadata, TLayoutComponent } from "@/types/next";

import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { cn } from "@/utilities/cn";
import { Zain } from "next/font/google";

import { NextIntlClientProvider } from "next-intl";
import { TooltipProvider } from "@/components/shadcn/tooltip";
import ThemeProvider from "@/components/locals/providers/theme-provider";
import { routing } from "@/i18n/routing";
import Script from "next/script";

const zain = Zain({
  weight: ["200", "300", "400", "700", "800", "900"],
  style: ["normal"],
  display: "swap",
  preload: true,
  fallback: ["Segoe UI", "sans-serif"],
  adjustFontFallback: true,
  subsets: ["latin"],
});

export const dynamic = "force-static";
export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export async function generateMetadata(
  props: TLayoutMetadata,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "app" });

  return t.raw("metadata");
}

export default async function RootLayout(props: TLayoutComponent) {
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
          defaultTheme="system"
          attribute="class"
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <TooltipProvider>{props.children}</TooltipProvider>
          </NextIntlClientProvider>
        </ThemeProvider>

        {(process.env.NODE_ENV === ENVIRONMENT.DEVELOPMENT ||
          process.env.NODE_ENV === ENVIRONMENT.TEST) && (
          <Script
            crossOrigin="anonymous"
            src="https://unpkg.com/react-scan/dist/auto.global.js"
          />
        )}
      </body>
    </html>
  );
}
