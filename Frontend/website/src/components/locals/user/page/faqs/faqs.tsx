import { getTranslations } from "next-intl/server";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/accordion";
import {
  Section,
  Container,
  Intro,
  Title,
  Description,
} from "@/components/locals/blocks/typography";
import { Link } from "@/components/locals/blocks/link";

type tQuestion = {
  id: string;
  question: string;
  answer: string;
};

async function Questions() {
  const tFaqs = await getTranslations("app.user.page.faqs");
  const questions: Array<tQuestion> = tFaqs.raw("questions");

  return (
    <Accordion
      collapsible
      type="single"
      className="bg-card ring-muted w-full rounded-sm border px-8 py-3 shadow-sm ring-4 dark:ring-0"
    >
      {questions.map((question) => (
        <AccordionItem
          key={question.id}
          value={question.id}
          className="border-dashed"
        >
          <AccordionTrigger className="cursor-pointer text-lg hover:no-underline">
            {question.question}
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground text-base">{question.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default async function FAQs() {
  const t = await getTranslations("app.user.page.faqs");

  return (
    <Section>
      <Container className="space-y-16">
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
