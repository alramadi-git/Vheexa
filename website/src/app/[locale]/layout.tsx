import "@/app/globals.css";

import { ENVIRONMENT } from "@/enums/environment";

import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import type { TLocale } from "@/types/next";

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

type TGenerateMetadata = {
  props: TLocale;
  return: Promise<Metadata>;
};
type TRootLayout = {
  props: TLocale & PropsWithChildren;
};

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
export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export async function generateMetadata(
  props: TGenerateMetadata["props"],
): TGenerateMetadata["return"] {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "app" });

  return t.raw("metadata");
}

export default async function RootLayout(props: TRootLayout["props"]) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const [t, messages] = await Promise.all([
    getTranslations("app.page"),
    getMessages({ locale }),
  ]);

  return (
    <html suppressHydrationWarning dir={t("dir")} lang={t("lang")}>
      <head>
        {(process.env.NODE_ENV === ENVIRONMENT.DEVELOPMENT ||
          process.env.NODE_ENV === ENVIRONMENT.TEST) && (
          <script
            defer
            crossOrigin="anonymous"
            src="https://unpkg.com/react-scan/dist/auto.global.js"
          />
        )}
      </head>
      <body className={cn(zain.className, "antialiased")}>
        <ThemeProvider
          enableSystem
          disableTransitionOnChange
          attribute="class"
          defaultTheme="light"
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <TooltipProvider>{props.children}</TooltipProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
