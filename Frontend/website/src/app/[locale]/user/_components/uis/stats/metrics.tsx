import { getTranslations } from "next-intl/server";
import { AnimatedNumber } from "@/components/motion-primitives/animated-number";

type TItem = {
  label: string;
  value: number;
};

export default async function Metrics() {
  const t = await getTranslations("app.user.page.stats.metrics");
  const items: Array<TItem> = t.raw("items");

  return (
    <div>
      <p className="text-2xl">{t("description")}</p>
      <div className="mt-6 grid grid-cols-4">
        {items.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center">
              <AnimatedNumber
                className="bg-linear-to-r from-zinc-950 to-zinc-600 bg-clip-text text-3xl font-medium text-transparent dark:from-white dark:to-zinc-800"
                springOptions={{
                  bounce: 10,
                  duration: 10000,
                }}
                value={item.value}
              />
              <span className="text-3xl">+</span>
            </div>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
