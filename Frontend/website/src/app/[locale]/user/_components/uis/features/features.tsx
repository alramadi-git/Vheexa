import { getTranslations } from "next-intl/server";
import {
  Container,
  Description,
  Intro,
  Section,
  Title,
} from "@/components/locals/blocks/typography";
import Illustration from "@/app/[locale]/user/_components/uis/features/illustration";
import Highlights from "@/app/[locale]/user/_components/uis/features/highlights";

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
