import { getTranslations } from "next-intl/server";

import {
  Section,
  Container,
  Intro,
  Title,
  Description,
} from "@/components/blocks/typography";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/shadcn/card";

import { Placeholder } from "@/components/blocks/images";

export default async function HowItWorks() {
  const tHowItWorks = await getTranslations("app.user.page.how-it-works");

  return (
    <Section>
      <Container className="space-y-6">
        <Intro>
          <Title>{tHowItWorks("title")}</Title>
          <Description>{tHowItWorks("description")}</Description>
        </Intro>
        <Steps />
      </Container>
    </Section>
  );
}

async function Steps() {
  const tHowItWorks = await getTranslations("app.user.page.how-it-works");

  return (
    <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <li>
        <Card className="h-full">
          <CardContent>
            <Placeholder className="h-64 w-full rounded" />
          </CardContent>
          <CardHeader className="block space-y-2">
            <CardTitle className="text-xl font-medium">
              {tHowItWorks("steps.book.label")}
            </CardTitle>
            <CardDescription>
              {tHowItWorks("steps.book.description")}
            </CardDescription>
          </CardHeader>
        </Card>
      </li>
      <li>
        <Card className="h-full">
          <CardContent>
            <Placeholder className="h-64 w-full rounded" />
          </CardContent>
          <CardHeader className="block space-y-2">
            <CardTitle className="text-xl font-medium">
              {tHowItWorks("steps.pick-up.label")}
            </CardTitle>
            <CardDescription>
              {tHowItWorks("steps.pick-up.description")}
            </CardDescription>
          </CardHeader>
        </Card>
      </li>
      <li>
        <Card className="h-full">
          <CardContent>
            <Placeholder className="h-64 w-full rounded" />
          </CardContent>
          <CardHeader className="block space-y-2">
            <CardTitle className="text-xl font-medium">
              {tHowItWorks("steps.return.label")}
            </CardTitle>
            <CardDescription>
              {tHowItWorks("steps.return.description")}
            </CardDescription>
          </CardHeader>
        </Card>
      </li>
    </ol>
  );
}
