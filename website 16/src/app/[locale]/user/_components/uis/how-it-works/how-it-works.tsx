import { getTranslations } from "next-intl/server";
import {
  Section,
  Container,
  Intro,
  Title,
  Description,
} from "@/components/locals/blocks/typography";
import Steps from "@/app/[locale]/user/_components/uis/how-it-works/steps";

export default async function HowItWorks() {
  const t = await getTranslations("app.user.page.how-it-works");

  return (
    <Section>
      <Container className="space-y-6">
        <Intro>
          <Title>{t("title")}</Title>
          <Description>{t("description")}</Description>
        </Intro>

        <Steps />
      </Container>
    </Section>
  );
}
