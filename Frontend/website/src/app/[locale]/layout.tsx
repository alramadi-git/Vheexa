import "../globals.css";

import { eEnvironment } from "@/enums/environment";
import { Cairo } from "next/font/google";
import type { Metadata } from "next";

import { cn } from "@/utilities/cn";
import { routing } from "@/i18n/routing";

import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import ThemeProvider from "@/components/locals/providers/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { TooltipProvider } from "@/components/shadcn/tooltip";
import { Toaster } from "@/components/shadcn/sonner";
import Script from "next/script";
import ReactQueryProvider from "@/components/locals/providers/react-query-provider";

const cairo = Cairo({
  weight: [
    "300" /** light   */,
    "400" /** normal  */,
    "500" /** medium  */,
    "700" /** bold    */,
    "900" /** black   */,
  ],
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
  props: LayoutProps<"/[locale]">,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "app.layout" });

  return t.raw("metadata");
}

export default async function Layout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, messages] = await Promise.all([
    getTranslations("app.settings"),
    getMessages({ locale }),
  ]);

  return (
    <html suppressHydrationWarning lang={t("lang")} dir={t("dir")}>
      <body className={cn(cairo.className, "antialiased")}>
        <ThemeProvider
          enableSystem
          disableTransitionOnChange
          defaultTheme="light"
          attribute="class"
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ReactQueryProvider>
              <TooltipProvider>
                {children}
                <Toaster position="bottom-right" />
              </TooltipProvider>
            </ReactQueryProvider>
          </NextIntlClientProvider>
        </ThemeProvider>

        {(process.env.NODE_ENV === eEnvironment.development ||
          process.env.NODE_ENV === eEnvironment.test) && (
          <Script
            crossOrigin="anonymous"
            src="https://unpkg.com/react-scan/dist/auto.global.js"
          />
        )}
      </body>
    </html>
  );
}
