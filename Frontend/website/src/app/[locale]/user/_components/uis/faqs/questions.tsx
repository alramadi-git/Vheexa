import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/accordion";
import { getTranslations } from "next-intl/server";

type TQuestion = {
  id: string;
  question: string;
  answer: string;
};

export default async function Questions() {
  const t = await getTranslations("app.user.page.faqs");
  const questions: Array<TQuestion> = t.raw("questions");

  return (
    <Accordion
      collapsible
      type="single"
      className="bg-card ring-muted w-full rounded-2xl border px-8 py-3 shadow-sm ring-4 dark:ring-0"
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
