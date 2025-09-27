import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/link";
import { ChevronLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { FullHDImage } from "@/components/locals/blocks/image";
import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur";

export default async function Hero() {
  const t = await getTranslations("app.user.page.hero");

  return (
    <section>
      <div className="py-24 md:pb-32 lg:pt-72 lg:pb-36">
        <div className="relative mx-auto flex max-w-7xl flex-col px-6 lg:block lg:px-12">
          <div className="mx-auto max-w-lg lg:ml-0 lg:max-w-full">
            <h1 className="mt-8 max-w-2xl text-5xl text-balance md:text-6xl lg:mt-16 xl:text-7xl">
              {t("title")}
            </h1>
            <p className="text-muted-foreground mt-8 max-w-2xl text-lg">{t("description")}</p>

            <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
              <Button
                key={1}
                asChild
                size="lg"
                className="h-12 pr-3 pl-5 text-base"
              >
                <Link href={t("actions.book-now.href")}>
                  <span className="text-nowrap">
                    {t("actions.book-now.label")}
                  </span>
                  <ChevronLeft className="ml-1" />
                </Link>
              </Button>
              <Button
                key={2}
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

      <div className="group relative m-auto max-w-7xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:max-w-44 md:border-l md:pl-6">
            <p className="text-end text-sm">{t("slider.label")}</p>
          </div>
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            {/** Blur */}
            <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
              <FullHDImage
                className="mx-auto h-5 w-fit dark:invert"
                src="https://html.tailus.io/blocks/customers/nvidia.svg"
                alt="Nvidia Logo"
              />
              <FullHDImage
                className="mx-auto h-4 w-fit dark:invert"
                src="https://html.tailus.io/blocks/customers/column.svg"
                alt="Column Logo"
              />
              <FullHDImage
                className="mx-auto h-4 w-fit dark:invert"
                src="https://html.tailus.io/blocks/customers/github.svg"
                alt="GitHub Logo"
              />
              <FullHDImage
                className="mx-auto h-5 w-fit dark:invert"
                src="https://html.tailus.io/blocks/customers/nike.svg"
                alt="Nike Logo"
              />
              <FullHDImage
                className="mx-auto h-5 w-fit dark:invert"
                src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                alt="Lemon Squeezy Logo"
              />
              <FullHDImage
                className="mx-auto h-4 w-fit dark:invert"
                src="https://html.tailus.io/blocks/customers/laravel.svg"
                alt="Laravel Logo"
              />
              <FullHDImage
                className="mx-auto h-7 w-fit dark:invert"
                src="https://html.tailus.io/blocks/customers/lilly.svg"
                alt="Lilly Logo"
              />
              <FullHDImage
                className="mx-auto h-6 w-fit dark:invert"
                src="https://html.tailus.io/blocks/customers/openai.svg"
                alt="OpenAI Logo"
              />
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
    </section>
  );
}
