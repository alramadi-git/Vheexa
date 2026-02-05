import { Metadata } from "next";
import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";

import { Container } from "@/components/locals/blocks/typography";
import { Placeholder, Logo } from "@/components/locals/blocks/images";

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
      <div className="h-fullscreen relative overflow-y-auto">
        <div className="absolute -z-10 size-full overflow-hidden">
          <AnimatedGridPattern
            duration={3}
            repeatDelay={1}
            maxOpacity={0.1}
            numSquares={64}
            className="skew-y-12 mask-[radial-gradient(450px_circle_at_center,white,transparent)]"
          />
        </div>
        <Container className="flex h-full flex-col gap-6 p-12">
          <div className="flex items-end gap-3">
            <Logo priority className="size-12" />
            <h2 className="text-4xl font-bold">{tLayout("company-name")}</h2>
          </div>
          <div className="my-auto">{children}</div>
        </Container>
      </div>
      <Placeholder
        priority
        className="hidden size-full rounded-e-sm object-cover xl:block"
      />
    </main>
  );
}
