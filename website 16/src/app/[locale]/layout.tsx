import "./../globals.css";

import { ENVIRONMENT } from "@/enums/environment";
import { type Metadata } from "next";
import { Cairo } from "next/font/google";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { cn } from "@/utilities/cn";
import { routing } from "@/i18n/routing";
import ThemeProvider from "@/components/locals/providers/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { TooltipProvider } from "@/components/shadcn/tooltip";
import Script from "next/script";
import { Toaster } from "@/components/shadcn/sonner";

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
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider
            enableSystem
            disableTransitionOnChange
            defaultTheme="light"
            attribute="class"
          >
            <TooltipProvider>
              {children}
              <Toaster position="bottom-right" />
            </TooltipProvider>
          </ThemeProvider>
        </NextIntlClientProvider>

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
