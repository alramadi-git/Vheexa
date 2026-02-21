import { getTranslations } from "next-intl/server";

import {
  Section,
  Container,
  Intro,
  Title,
  Description,
} from "@/components/blocks/typography";

import { FullHDImage } from "@/components/blocks/images";

import { Separator } from "@/components/shadcn/separator";

import { Blockquote } from "@/components/blocks/typography";

type tItem = {
  label: string;
  value: number;
};

export default async function Stats() {
  const tStats = await getTranslations("app.user.page.stats");

  return (
    <Section>
      <Container className="space-y-8 md:space-y-12">
        <Intro>
          <Title className="max-w-3xl">{tStats("title")}</Title>
          <Description className="max-w-5xl">
            {tStats("description")}
          </Description>
        </Intro>
        <div className="grid gap-6 xl:grid-cols-2">
          <Testimonial />
          <Separator orientation="horizontal" className="xl:hidden" />
          <Metrics />
        </div>
      </Container>
    </Section>
  );
}

async function Testimonial() {
  const tTestimonial = await getTranslations("app.user.page.stats.testimonial");

  return (
    <div>
      <Blockquote>{tTestimonial("quote")}</Blockquote>
      <div className="mt-6 flex gap-2">
        <FullHDImage
          src={tTestimonial("author.avatar.url")}
          alt={tTestimonial("author.avatar.alternate")}
          className="size-6 rounded"
        />
        <cite className="block font-medium not-italic">
          {tTestimonial("author.name")}, {tTestimonial("author.role")}
        </cite>
      </div>
    </div>
  );
}

async function Metrics() {
  const tMetrics = await getTranslations("app.user.page.stats.metrics");
  const items: tItem[] = tMetrics.raw("items");

  return (
    <div>
      <p className="text-2xl">{tMetrics("description")}</p>
      <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4 xl:flex xl:flex-nowrap xl:justify-between">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col gap-1">
            <div className="flex items-center md:order-2">
              <p className="bg-linear-to-r from-zinc-950 to-zinc-600 bg-clip-text text-3xl font-medium text-transparent dark:from-white dark:to-zinc-800">
                {item.value}
                <span className="ms-1">+</span>
              </p>
            </div>
            <p className="text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
