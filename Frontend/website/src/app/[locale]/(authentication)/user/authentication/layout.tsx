import type { Metadata } from "next";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { Card, CardContent } from "@/components/shadcn/card";
import { FullHDImage } from "@/components/locals/blocks/image";

export const dynamic = "force-static";
export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]/user/authentication">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "app.user.authentication.layout",
  });

  return t.raw("metadata");
}

export default async function Layout({
  params,
  children,
}: LayoutProps<"/[locale]/user/authentication">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("app.user.authentication.layout");

  return (
    <main className="relative flex h-dvh items-center justify-center overflow-hidden">
      <AnimatedGridPattern
        duration={3}
        numSquares={0}
        repeatDelay={1}
        maxOpacity={0.1}
        className="-z-10 skew-y-12 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
      />
      <Card className="bg-transparent p-0">
        <CardContent className="grid h-[550px] w-[850px] overflow-hidden p-0 md:grid-cols-2">
          {children}

          <FullHDImage
            src={t("image.src")}
            alt={t("image.alt")}
            className="size-full object-cover max-md:hidden dark:brightness-[0.2] dark:grayscale"
          />
        </CardContent>
      </Card>
    </main>
  );
}
