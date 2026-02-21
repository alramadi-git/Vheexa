import "../globals.css";

import { eEnvironment } from "@/enums/environment";
import { Metadata } from "next";

import { Cairo } from "next/font/google";
import { cn } from "@/utilities/cn";

import { routing } from "@/i18n/routing";
import { getTranslations, getMessages } from "next-intl/server";

import ThemeProvider from "@/components/providers/theme";
import { NextIntlClientProvider } from "next-intl";
import ReactQueryProvider from "@/components/providers/react-query";
import { TooltipProvider } from "@/components/shadcn/tooltip";
import { Toaster } from "@/components/shadcn/sonner";
import Script from "next/script";

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

export async function generateMetadata(): Promise<Metadata> {
  return (await getTranslations("app.layout")).raw("metadata");
}

export default async function Layout({ children }: LayoutProps<"/[locale]">) {
  const [tSettings, messages] = await Promise.all([
    getTranslations("settings"),
    getMessages(),
  ]);

  return (
    <html
      suppressHydrationWarning
      lang={tSettings("language")}
      dir={tSettings("direction")}
    >
      <body className={cn(cairo.className, "antialiased")}>
        <ThemeProvider
          enableSystem
          disableTransitionOnChange
          defaultTheme="dark"
          attribute="class"
        >
          <NextIntlClientProvider
            locale={tSettings("language")}
            messages={messages}
          >
            <ReactQueryProvider>
              <TooltipProvider>
                {children}
                <Toaster
                  position={
                    tSettings("direction") === "ltr" ? "top-right" : "top-left"
                  }
                />
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
