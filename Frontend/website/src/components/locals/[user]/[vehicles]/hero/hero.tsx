import { getTranslations } from "next-intl/server";

import { LuArrowUpRight } from "react-icons/lu";
import {
  Section,
  Container,
  Intro,
  H,
  Title,
  Description,
} from "@/components/locals/blocks/typography";
import { Badge } from "@/components/shadcn/badge";
import { FullHDImage } from "@/components/locals/blocks/image";

import Background from "./background";

export default async function Hero() {
  const tHero = await getTranslations("app.user.vehicles.page.hero");

  return (
    <div className="relative">
      <Background />
      
      <Container>
        <Section className="grid lg:grid-cols-2 lg:gap-8">
          <div className="space-y-8 max-lg:my-auto lg:space-y-12">
            <Badge
              variant="secondary"
              className="border-border rounded-full py-1"
            >
              {tHero.rich("badge", {
                ArrowUpRight: () => <LuArrowUpRight className="ml-1 size-4" />,
              })}
            </Badge>

            <Intro className="lg:space-y-6">
              <Title level={H._1} className="lg:text-5xl xl:text-6xl">
                {tHero("title")}
              </Title>

              <Description className="text-base md:text-lg">
                {tHero("description")}
              </Description>
            </Intro>
          </div>

          <div className="hidden lg:block">
            <FullHDImage
              priority
              src={tHero("image.src")}
              alt={tHero("image.alt")}
              className="w-full rounded-sm lg:h-[400px] xl:h-[450px]"
            />
          </div>
        </Section>
      </Container>
    </div>
  );
}
