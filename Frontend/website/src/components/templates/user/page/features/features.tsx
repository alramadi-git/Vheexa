import { getTranslations } from "next-intl/server";

import { LuZap, LuDollarSign, LuFingerprint, LuEarth } from "react-icons/lu";

import {
  Section,
  Container,
  Intro,
  Title,
  Description,
} from "@/components/locals/blocks/typography";

import { Placeholder as PlaceholderBlock } from "@/components/locals/blocks/images";

export default async function Features() {
  const tFeatures = await getTranslations("app.user.page.features");

  return (
    <Section>
      <Container className="space-y-8 md:space-y-12">
        <Intro className="max-w-2xl">
          <Title>{tFeatures("title")}</Title>
          <Description>{tFeatures("description")}</Description>
        </Intro>
        <Placeholder />
        <Highlights />
      </Container>
    </Section>
  );
}

async function Placeholder() {
  return (
    <div className="-mx-4 hidden mask-b-from-75% mask-b-to-95% mask-l-from-75% mask-l-to-95% pt-3 pr-3 md:-mx-12 md:block">
      <div className="perspective-midrange">
        <div className="rotate-x-6 -skew-2">
          <div className="aspect-88/36">
            <PlaceholderBlock className="h-137.5 rounded lg:h-162.5" />
          </div>
        </div>
      </div>
    </div>
  );
}

async function Highlights() {
  const tHighlights = await getTranslations(
    "app.user.page.features.highlights",
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <div className="space-y-2 p-2">
        <div className="flex items-center gap-3">
          <LuZap className="size-6" />
          <h3 className="text-2xl font-medium">
            {tHighlights("ease-of-use.label")}
          </h3>
        </div>
        <p className="text-muted-foreground">
          {tHighlights("ease-of-use.description")}
        </p>
      </div>
      <div className="space-y-2 p-2">
        <div className="flex items-center gap-3">
          <LuDollarSign className="size-6" />
          <h3 className="text-2xl font-medium">
            {tHighlights("competitive-prices.label")}
          </h3>
        </div>
        <p className="text-muted-foreground">
          {tHighlights("competitive-prices.description")}
        </p>
      </div>
      <div className="space-y-2 p-2">
        <div className="flex items-center gap-3">
          <LuFingerprint className="size-6" />
          <h3 className="text-2xl font-medium">
            {tHighlights("trust-and-Security.label")}
          </h3>
        </div>
        <p className="text-muted-foreground">
          {tHighlights("trust-and-Security.description")}
        </p>
      </div>
      <div className="space-y-2 p-2">
        <div className="flex items-center gap-3">
          <LuEarth className="size-6" />
          <h3 className="text-2xl font-medium">
            {tHighlights("variety-and-coverage.label")}
          </h3>
        </div>
        <p className="text-muted-foreground">
          {tHighlights("variety-and-coverage.description")}
        </p>
      </div>
    </div>
  );
}
