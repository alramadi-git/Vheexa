import { FullHDImage } from "@/components/locals/blocks/image";
import {
  Description,
  Section,
  Title,
} from "@/components/locals/blocks/typography";
import {
  type LucideProps,
  Zap,
  DollarSign,
  Fingerprint,
  Earth,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ComponentType } from "react";

type THighlight = {
  icon: ComponentType<LucideProps>;
  label: string;
  description: string;
};

const icons = [Zap, DollarSign, Fingerprint, Earth];

export default async function Features() {
  const t = await getTranslations("app.user.page.features");

  const highlights: Array<THighlight> = t
    .raw("highlights")
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    .map((highlight, index) => ({
      icon: icons[index],
      label: highlight.label,
      description: highlight.description,
    }));

  return (
    <Section>
      <div className="container space-y-8 px-6 md:space-y-12">
        <div className="max-w-2xl">
          <Title>{t("title")}</Title>
          <Description>{t("description")}</Description>
        </div>
        <div className="relative -mx-4 mask-b-from-75% mask-b-to-95% mask-l-from-75% mask-l-to-95% pt-3 pr-3 md:-mx-12">
          <div className="perspective-midrange">
            <div className="rotate-x-6 -skew-2">
              <div className="relative aspect-88/36">
                <FullHDImage
                  src={t("illustration.src")}
                  alt={t("illustration.alt")}
                  className="h-[500px] rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 divide-x divide-gray-300 sm:gap-8 lg:grid-cols-4">
          {highlights.map((highlight, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2">
                <highlight.icon className="size-4" />
                <h3 className="text-sm font-medium">{highlight.label}</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                {highlight.description}{" "}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
