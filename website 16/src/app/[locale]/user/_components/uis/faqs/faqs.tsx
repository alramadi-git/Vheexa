import { getTranslations } from "next-intl/server";
import {
  Section,
  Container,
  Intro,
  Title,
  Description,
} from "@/components/locals/blocks/typography";
import Questions from "./questions";
import { Link } from "@/components/locals/blocks/link";

export default async function FAQs() {
  const t = await getTranslations("app.user.page.faqs");

  return (
    <Section>
      <Container className="max-w-5xl space-y-16">
        <Intro>
          <Title>{t("title")}</Title>
          <Description>{t("description")}</Description>
        </Intro>

        <Questions />

        <p className="text-muted-foreground font-medium">
          {t.rich("help", {
            link: (chunk) => (
              <Link
                href="/user/faqs"
                className="px-2 text-blue-400 hover:underline"
              >
                {chunk}
              </Link>
            ),
          })}
        </p>
      </Container>
    </Section>
  );
}
