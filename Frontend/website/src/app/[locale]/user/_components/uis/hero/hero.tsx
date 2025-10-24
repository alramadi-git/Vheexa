import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/link";
import { ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { FullHDImage } from "@/components/locals/blocks/image";
import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur";
import {
  Container,
  Description,
  Intro,
  Section,
  LEVEL,
  Title,
} from "@/components/locals/blocks/typography";

type TCredibility = {
  src: string;
  alt: string;
};

export default async function Hero() {
  const t = await getTranslations("app.user.page.hero");
  const partners: Array<TCredibility> = t.raw("credibility.items");

  return (
    <Section className="h-hero">
      <Container className="flex h-full flex-col justify-between">
        <div>
          <Intro>
            <Title level={LEVEL.H1} className="max-w-2xl text-6xl">
              {t("title")}
            </Title>
            <Description className="max-w-2xl">{t("description")}</Description>
          </Intro>

          <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
            <Button asChild size="lg" className="h-12 pr-3 pl-5 text-base">
              <Link href={t("actions.book-now.href")}>
                <span className="text-nowrap">
                  {t("actions.book-now.label")}
                </span>
                <ChevronRight className="ms-1" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-12 px-5 text-base hover:bg-zinc-950/5 dark:hover:bg-white/5"
            >
              <Link href={t("actions.learn-more.href")}>
                <span className="text-nowrap">
                  {t("actions.learn-more.label")}
                </span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="group px-6">
          <div className="flex flex-col items-center md:flex-row">
            <div className="border-e pe-6 md:max-w-44">
              <p className="text-start">{t("credibility.label")}</p>
            </div>
            <div className="relative py-6 md:w-[calc(100%-11rem)]">
              {/** Credibility */}
              <InfiniteSlider speedOnHover={20} speed={64} gap={128}>
                {partners.map((item, index) => (
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
        </div>
      </Container>
    </Section>
  );
}
