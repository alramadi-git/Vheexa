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
import Illustration from "@/app/[locale]/user/_components/uis/features/illustration";

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
  const t = await getTranslations("app.user.page.features");

  return (
    <Section>
      <Container className="space-y-8 px-6 md:space-y-12">
        <Intro className="max-w-2xl">
          <Title>{t("title")}</Title>
          <Description>{t("description")}</Description>
        </Intro>
        <Illustration />
        <Highlights />
      </Container>
    </Section>
  );
}
