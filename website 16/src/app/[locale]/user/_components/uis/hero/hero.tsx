import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/link";
import { ChevronLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { FullHDImage } from "@/components/locals/blocks/image";
import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur";

type TCredibility = {
  src: string;
  alt: string;
};

export default async function Hero() {
  const t = await getTranslations("app.user.page.hero");
  const partners: Array<TCredibility> = t.raw("credibility.items");

  return (
    <section>
      <div className="container">
        <div className="py-24 md:pb-32 lg:pt-72 lg:pb-36">
          <div className="relative flex flex-col px-6 lg:block lg:px-12">
            <div className="mx-auto max-w-lg lg:ml-0 lg:max-w-full">
              <h1 className="mt-8 max-w-2xl text-5xl text-balance md:text-6xl lg:mt-16 xl:text-7xl">
                {t("title")}
              </h1>
              <p className="text-muted-foreground mt-8 max-w-2xl text-lg">
                {t("description")}
              </p>

              <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
                <Button asChild size="lg" className="h-12 pr-3 pl-5 text-base">
                  <Link href={t("actions.book-now.href")}>
                    <span className="text-nowrap">
                      {t("actions.book-now.label")}
                    </span>
                    <ChevronLeft className="ml-1" />
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
          </div>
        </div>

        <div className="group relative px-6">
          <div className="flex flex-col items-center md:flex-row">
            <div className="md:max-w-44 md:border-l md:pl-6">
              <p className="text-end">{t("credibility.label")}</p>
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
      </div>
    </section>
  );
}
