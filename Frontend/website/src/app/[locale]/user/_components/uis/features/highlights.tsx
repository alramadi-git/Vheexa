import { type ComponentType } from "react";

import type { LucideProps } from "lucide-react";
import { Zap, DollarSign, Fingerprint, Earth } from "lucide-react";

import { getTranslations } from "next-intl/server";

type THighlight = {
  icon: ComponentType<LucideProps>;
  label: string;
  description: string;
};

const icons = [Zap, DollarSign, Fingerprint, Earth];

export default async function Highlights() {
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
    <div className="mx-auto grid grid-cols-4 gap-6 divide-x divide-gray-300">
      {highlights.map((highlight, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center gap-3">
            <highlight.icon className="size-6" />
            <h3 className="text-2xl font-medium">{highlight.label}</h3>
          </div>
          <p className="text-muted-foreground">{highlight.description}</p>
        </div>
      ))}
    </div>
  );
}
