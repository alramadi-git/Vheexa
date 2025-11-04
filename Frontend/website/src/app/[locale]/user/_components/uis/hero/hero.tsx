import { getTranslations } from "next-intl/server";

import { LuChevronRight } from "react-icons/lu";
import {
  Section,
  Container,
  Intro,
  H,
  Title,
  Description,
} from "@/components/locals/blocks/typography";
import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/link";
import { FullHDImage } from "@/components/locals/blocks/image";
import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur";

type tPartnerLogo = {
  src: string;
  alt: string;
};

async function Partners() {
  const t = await getTranslations("app.user.page.hero.partners");
  const logos: Array<tPartnerLogo> = t.raw("logos");

  return (
    <div className="flex flex-col items-center gap-3 md:flex-row">
      <p className="hidden border-e pe-6 text-start md:block">{t("label")}</p>

      <div className="relative max-w-full py-6 md:max-w-[calc(100%-150px)]">
        {/** Logos */}
        <InfiniteSlider speedOnHover={24} speed={48} gap={96}>
          {logos.map((item, index) => (
            <FullHDImage
              key={index}
              unoptimized
              className="mx-auto size-12 dark:invert"
              src={item.src}
              alt={item.alt}
            />
          ))}
        </InfiniteSlider>

        {/** Blur */}
        <div className="from-background absolute inset-y-0 left-0 w-20 bg-linear-to-r"></div>
        <div className="from-background absolute inset-y-0 right-0 w-20 bg-linear-to-l"></div>
        <ProgressiveBlur
          className="pointer-events-none absolute top-0 left-0 h-full w-20"
          direction="left"
          blurIntensity={1}
        />
        <ProgressiveBlur
          className="pointer-events-none absolute top-0 right-0 h-full w-20"
          direction="right"
          blurIntensity={1}
        />
      </div>
    </div>
  );
}

export default async function Hero() {
  const t = await getTranslations("app.user.page.hero");

  return (
    <Section>
      <Container className="space-y-6">
        <Intro>
          <Title level={H._1} className="max-w-2xl sm:text-5xl">
            {t("title")}
          </Title>
          <Description className="max-w-2xl">{t("description")}</Description>
        </Intro>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Button asChild size="lg" className="text-base">
            <Link href={t("actions.book-now.href")}>
              <span className="text-nowrap">{t("actions.book-now.label")}</span>
              <LuChevronRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-base">
            <Link href={t("actions.learn-more.href")}>
              <span className="text-nowrap">
                {t("actions.learn-more.label")}
              </span>
            </Link>
          </Button>
        </div>

        <Partners />
      </Container>
    </Section>
  );
}
