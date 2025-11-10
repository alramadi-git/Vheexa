import { getTranslations } from "next-intl/server";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/shadcn/card";
import {
  Section,
  Container,
  Intro,
  Title,
  Description,
} from "@/components/locals/blocks/typography";

import { FullHDImage } from "@/components/locals/blocks/image";

type tStep = {
  label: string;
  description: string;
  illustration: {
    src: string;
    alt: string;
  };
};
async function Steps() {
  const t = await getTranslations("app.user.page.how-it-works");
  const steps: Array<tStep> = t.raw("steps");

  return (
    <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {steps.map((step, index) => (
        <li key={index} >
          <Card className="h-full">
            <CardContent>
              <FullHDImage
                src={step.illustration.src}
                alt={step.illustration.alt}
                className="h-64 w-full rounded-lg"
              />
            </CardContent>
            <CardHeader className="block space-y-2">
              <CardTitle className="text-xl font-medium">
                {step.label}
              </CardTitle>
              <CardDescription>{step.description} </CardDescription>
            </CardHeader>
          </Card>
        </li>
      ))}
    </ol>
  );
}

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
