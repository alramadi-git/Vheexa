import type { Metadata } from "next";

import { getTranslations, setRequestLocale } from "next-intl/server";

import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { Card, CardContent } from "@/components/shadcn/card";
import { FullHDImage } from "@/components/locals/blocks/image";
import { Container, Section } from "@/components/locals/blocks/typography";

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
    <main className="relative h-dvh overflow-hidden">
      <Section className="flex size-full items-center justify-center">
        <AnimatedGridPattern
          duration={3}
          numSquares={64}
          repeatDelay={1}
          maxOpacity={0.1}
          className="-z-10 skew-y-12 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
        />
        <Container className="flex items-center justify-center">
          <Card className="h-[500px] w-[850px] rounded-sm bg-transparent p-0">
            <CardContent className="grid size-full p-0 md:grid-cols-2">
              {children}

              <FullHDImage
                priority
                src={t("image.src")}
                alt={t("image.alt")}
                className="hidden size-full rounded-e-sm object-cover md:block dark:brightness-[0.2] dark:grayscale"
              />
            </CardContent>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
