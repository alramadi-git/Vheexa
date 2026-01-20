import { Metadata } from "next";
import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";

import { FullHDImage, HDImage } from "@/components/locals/blocks/images";
import { Container } from "@/components/locals/blocks/typography";

export const dynamic = "force-static";
export async function generateMetadata(): Promise<Metadata> {
  return (await getTranslations("app.authentication.layout")).raw("metadata");
}

export default async function Layout({
  children,
}: LayoutProps<"/[locale]">): Promise<ReactNode> {
  const tLayout = await getTranslations("app.authentication.layout");

  return (
    <main className="authentication grid xl:grid-cols-2">
      <div className="h-fullscreen overflow-y-auto">
        <div className="relative overflow-hidden">
          <AnimatedGridPattern
            duration={3}
            repeatDelay={1}
            maxOpacity={0.1}
            numSquares={64}
            className="-z-10 skew-y-12 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
          />
        </div>
        <Container className="flex h-full flex-col gap-6 p-12">
          <div className="flex items-end gap-1">
            <HDImage
              src={tLayout("logo.url")}
              alt={tLayout("logo.alternate")}
              className="size-12"
            />
            <h2 className="text-4xl font-bold">{tLayout("logo.label")}</h2>
          </div>
          <div className="mt-auto">{children}</div>
        </Container>
      </div>
      <FullHDImage
        priority
        src={tLayout("illustration.url")}
        alt={tLayout("illustration.alternate")}
        className="hidden size-full rounded-e-sm object-cover xl:block dark:brightness-[0.2] dark:grayscale"
      />
    </main>
  );
}
