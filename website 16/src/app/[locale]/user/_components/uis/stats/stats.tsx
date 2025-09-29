import { FullHDImage } from "@/components/locals/blocks/image";
import { AnimatedNumber } from "@/components/motion-primitives/animated-number";
import { getTranslations } from "next-intl/server";

type TItem = {
  label: string;
  value: number;
};

export default async function Stats() {
  const t = await getTranslations("app.user.page.stats");

  const items: Array<TItem> = t.raw("metrics.items");

  return (
    <section className="py-16 md:py-32">
      <div className="container space-y-8 px-6 md:space-y-12">
        <div className="relative z-10 max-w-xl space-y-6">
          <h2 className="text-4xl font-medium lg:text-5xl">{t("title")}</h2>
          <p>{t("description")}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
          <div>
            <p>{t("metrics.description")}</p>

            <div className="my-12 grid grid-cols-2 gap-2 md:mb-0">
              {items.map((item, index) => (
                <div key={index} className="space-y-4">
                  <AnimatedNumber
                    className="bg-linear-to-r from-zinc-950 to-zinc-600 bg-clip-text text-3xl font-medium text-transparent dark:from-white dark:to-zinc-800"
                    springOptions={{
                      bounce: 2,
                      duration: 10000,
                    }}
                    value={item.value}
                  />
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <blockquote className="border-s-4 ps-4">
              {t("testimonial.quote")}
            </blockquote>
            <div className="mt-6 flex gap-3">
              <FullHDImage
                src={t("testimonial.author.avatar.src")}
                alt={t("testimonial.author.avatar.alt")}
                className="size-6 rounded-sm"
              />
              <cite className="block font-medium">
                {t("testimonial.author.name")}, {t("testimonial.author.role")}
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
