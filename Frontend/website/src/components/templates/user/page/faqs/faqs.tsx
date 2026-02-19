import { getTranslations } from "next-intl/server";

import {
  Section,
  Container,
  Intro,
  Title,
  Description,
} from "@/components/locals/blocks/typography";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/accordion";

import { Link } from "@/components/locals/blocks/links";

type tQuestion = {
  question: string;
  answer: string;
};

export default async function FAQs() {
  const tFAQs = await getTranslations("app.user.page.faqs");
  const questions: tQuestion[] = tFAQs.raw("questions");

  return (
    <Section>
      <Container className="space-y-16">
        <Intro>
          <Title>{tFAQs("title")}</Title>
          <Description>{tFAQs("description")}</Description>
        </Intro>
        <Questions questions={questions} />
        <p className="text-muted-foreground font-medium">
          {tFAQs.rich("help", {
            link: (chunk) => (
              <Link
                href="#"
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

type tQuestionsProps = {
  questions: tQuestion[];
};
async function Questions({ questions }: tQuestionsProps) {
  return (
    <Accordion
      collapsible
      type="single"
      className="bg-card ring-muted w-full rounded-sm border px-8 py-3 shadow-sm ring-4 dark:ring-0"
    >
      {questions.map((question) => (
        <AccordionItem
          key={question.question}
          value={question.question}
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
