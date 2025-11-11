import { getTranslations } from "next-intl/server";

import type { IconType } from "react-icons/lib";
import { LuZap, LuDollarSign, LuFingerprint, LuEarth } from "react-icons/lu";

import {
  Container,
  Description,
  Intro,
  Section,
  Title,
} from "@/components/locals/blocks/typography";
import { FullHDImage } from "@/components/locals/blocks/image";

async function Illustration() {
  const t = await getTranslations("app.user.page.features.illustration");

  return (
    <div className="-mx-4 hidden mask-b-from-75% mask-b-to-95% mask-l-from-75% mask-l-to-95% pt-3 pr-3 md:-mx-12 md:block">
      <div className="perspective-midrange">
        <div className="rotate-x-6 -skew-2">
          <div className="aspect-88/36">
            <FullHDImage
              src={t("src")}
              alt={t("alt")}
              className="h-[550px] rounded-sm lg:h-[650px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type tHighlight = {
  icon: IconType;
  label: string;
  description: string;
};

const hightLightIcons = [LuZap, LuDollarSign, LuFingerprint, LuEarth];
async function Highlights() {
  const t = await getTranslations("app.user.page.features");

  const highlights: Array<tHighlight> = t
    .raw("highlights")
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    .map((highlight, index) => ({
      icon: hightLightIcons[index],
      label: highlight.label,
      description: highlight.description,
    }));

  return (
    <div className="grid gap-6 divide-gray-300 max-md:divide-y md:grid-cols-2 md:divide-x xl:grid-cols-4">
      {highlights.map((highlight, index) => (
        <div key={index} className="space-y-2 p-2">
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

export default async function Features() {
  const tFeatures = await getTranslations("app.user.page.features");

  return (
    <Section>
      <Container className="space-y-8 md:space-y-12">
        <Intro className="max-w-2xl">
          <Title>{tFeatures("title")}</Title>
          <Description>{tFeatures("description")}</Description>
        </Intro>
        <Illustration />
        <Highlights />
      </Container>
    </Section>
  );
}
