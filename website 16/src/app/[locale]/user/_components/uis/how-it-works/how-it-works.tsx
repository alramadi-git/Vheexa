import { getTranslations } from "next-intl/server";
import {
  Section,
  Container,
  Intro,
  Title,
  Description,
} from "@/components/locals/blocks/typography";

export default async function HowItWorks() {
  const t = await getTranslations("app.user.page.how-it-works");

  return (
    <Section>
      <Container>
        <Intro>
          <Title>{t("title")}</Title>
          <Description>{t("description")}</Description>
        </Intro>
      </Container>
    </Section>
  );
}
