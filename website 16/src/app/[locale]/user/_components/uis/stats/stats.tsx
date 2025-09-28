import { FullHDImage } from "@/components/locals/blocks/image";
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
                  <div className="bg-linear-to-r from-zinc-950 to-zinc-600 bg-clip-text text-5xl font-bold text-transparent dark:from-white dark:to-zinc-800">
                    {item.value}
                  </div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <blockquote className="border-s-4 ps-4">
              <p>
                Using TailsUI has been like unlocking a secret design
                superpower. {"It's"} the perfect fusion of simplicity and
                versatility, enabling us to create UIs that are as stunning as
                they are user-friendly.
              </p>

              <div className="mt-6 space-y-3">
                <cite className="block font-medium">John Doe, CEO</cite>
                <FullHDImage
                  src="https://html.tailus.io/blocks/customers/nvidia.svg"
                  alt="Nvidia Logo"
                  className="h-5 w-fit dark:invert"
                />
              </div>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
