import { getTranslations } from "next-intl/server";

import {
  Section,
  Container,
  Intro,
  Title,
  Description,
} from "@/components/locals/blocks/typography";

import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/links";

import { Logo } from "@/components/locals/blocks/images";

import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur";

export default async function Hero() {
  const tHero = await getTranslations("app.user.page.hero");

  return (
    <Section>
      <Container className="space-y-6">
        <Intro>
          <Title heading="h1" className="max-w-2xl sm:text-5xl">
            {tHero("title")}
          </Title>
          <Description className="max-w-2xl">
            {tHero("description")}
          </Description>
        </Intro>
        <Button asChild size="lg" variant="outline" className="text-base">
          <Link href={tHero("actions.learn-more.url")}>
            <span className="text-nowrap">
              {tHero("actions.learn-more.label")}
            </span>
          </Link>
        </Button>
        <Partners />
      </Container>
    </Section>
  );
}

async function Partners() {
  const tPartners = await getTranslations("app.user.page.hero.partners");

  return (
    <div className="flex items-center gap-3 md:flex-row">
      <p className="hidden border-e pe-6 text-start md:block">
        {tPartners("label")}
      </p>
      <div className="relative max-w-full py-6 md:max-w-[calc(100%-150px)]">
        <InfiniteSlider speedOnHover={24} speed={48} gap={96}>
          <Logo priority className="mx-auto size-12" />
          <Logo priority className="mx-auto size-12" />
          <Logo priority className="mx-auto size-12" />
          <Logo priority className="mx-auto size-12" />
          <Logo priority className="mx-auto size-12" />
          <Logo priority className="mx-auto size-12" />
          <Logo priority className="mx-auto size-12" />
          <Logo priority className="mx-auto size-12" />
        </InfiniteSlider>
        <div className="from-background absolute inset-y-0 left-0 w-20 bg-linear-to-r"></div>
        <div className="from-background absolute inset-y-0 right-0 w-20 bg-linear-to-l"></div>
        <ProgressiveBlur
          blurIntensity={1}
          direction="left"
          className="pointer-events-none absolute top-0 left-0 h-full w-20"
        />
        <ProgressiveBlur
          blurIntensity={1}
          direction="right"
          className="pointer-events-none absolute top-0 right-0 h-full w-20"
        />
      </div>
    </div>
  );
}
