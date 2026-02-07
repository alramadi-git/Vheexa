import { getTranslations } from "next-intl/server";

import {
  Section,
  Container,
  Title,
  Description,
} from "@/components/locals/blocks/typography";

export default async function Contact() {
  const tContact = await getTranslations("app.user.contact.page.contact");

  return (
    <Section>
      <Container className="space-y-8">
        <div className="flex items-center justify-center">
          <h1 className="border-primary/65 items-center border-b-2 px-2 pb-2 font-bold">
            {tContact("title")}
          </h1>
        </div>
        <div>
          <Title className="text-center">{tContact("subtitle")}</Title>
          <Description className="text-center">
            {tContact("description")}
          </Description>
        </div>
      </Container>
    </Section>
  );
}
