import { Metadata } from "next";
import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";

import { FullHDImage } from "@/components/locals/blocks/images";

export const dynamic = "force-static";
export async function generateMetadata(): Promise<Metadata> {
  return (await getTranslations("app.authentication.layout")).raw("metadata");
}

export default async function Layout({
  children,
}: LayoutProps<"/[locale]">): Promise<ReactNode> {
  const tLayout = await getTranslations("app.authentication.layout");

  return (
    <main className="grid h-dvh overflow-hidden md:grid-cols-2">
      <div className="relative">
        <AnimatedGridPattern
          duration={3}
          repeatDelay={1}
          maxOpacity={0.1}
          numSquares={64}
          className="-z-10 skew-y-12 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
        />
        {children}
      </div>
      <FullHDImage
        priority
        src={tLayout("illustration.url")}
        alt={tLayout("illustration.alternate")}
        className="hidden size-full rounded-e-sm object-cover md:block dark:brightness-[0.2] dark:grayscale"
      />
    </main>
  );
}
