import { getTranslations } from "next-intl/server";

import {
  Section,
  Container,
  Intro,
  Title,
  Description,
} from "@/components/locals/blocks/typography";
import Metrics from "@/app/[locale]/user/_components/uis/stats/metrics";
import Testimonial from "@/app/[locale]/user/_components/uis/stats/testimonial";

export default async function Stats() {
  const t = await getTranslations("app.user.page.stats");

  return (
    <Section>
      <Container className="space-y-8 px-6 md:space-y-12">
        <Intro>
          <Title className="max-w-3xl">{t("title")}</Title>
          <Description className="max-w-5xl">{t("description")}</Description>
        </Intro>
        <div className="grid grid-cols-2 gap-12">
          <Metrics />
          <Testimonial />
        </div>
      </Container>
    </Section>
  );
}
