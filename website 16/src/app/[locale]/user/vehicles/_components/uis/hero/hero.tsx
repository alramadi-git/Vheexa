import { getTranslations } from "next-intl/server";

// import Background from "@/app/[locale]/user/vehicles/_components/uis/hero/background";

import { ArrowUpRight } from "lucide-react";
import {
  Section,
  Container,
  Intro,
  Title,
  Description,
  LEVEL,
} from "@/components/locals/blocks/typography";
import { Badge } from "@/components/shadcn/badge";
import { FullHDImage } from "@/components/locals/blocks/image";

export default async function Hero() {
  const t = await getTranslations("app.user.vehicles.page.hero");

  return (
    <Section className="h-hero overflow-hidden">
      {/* <Background /> */}

      <Container className="grid h-full grid-cols-2 items-center">
        <div className="space-y-12 pe-8">
          <Badge
            variant="secondary"
            className="border-border rounded-full py-1"
          >
            {t.rich("badge", {
              ArrowUpRight: () => <ArrowUpRight className="ml-1 size-4" />,
            })}
          </Badge>

          <Intro>
            <Title level={LEVEL.H1} className="text-6xl">
              {t("title")}
            </Title>

            <Description>{t("description")}</Description>
          </Intro>
        </div>

        <div className="relative size-full overflow-hidden rounded-lg">
          <FullHDImage
            priority
            src={t("image.src")}
            alt={t("image.alt")}
            className="absolute z-10 size-full"
          />
        </div>
      </Container>
    </Section>
  );
}
