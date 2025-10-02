// import Background from "./background";
import { getTranslations } from "next-intl/server";

import { Container, Section } from "@/components/locals/blocks/typography";
import { Badge } from "@/components/shadcn/badge";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { FullHDImage } from "@/components/locals/blocks/image";

export default async function Hero() {
  const t = await getTranslations("app.user.vehicles.page.hero");

  return (
    <Section className="h-screen overflow-hidden py-0">
      {/* <Background /> */}

      <Container className="grid h-full grid-cols-2">
        <div className="my-auto">
          <Badge
            variant="secondary"
            className="border-border rounded-full py-1"
          >
            {t.rich("badge", {
              "ar-SA": () => <ArrowUpLeft className="ml-1 size-4" />,
            })}
          </Badge>

          <h1 className="mt-6 max-w-[17ch] text-4xl leading-[1.2]! font-semibold tracking-tighter md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]">
            {t("title")}
          </h1>
          <p className="mt-6 max-w-[60ch] text-lg">{t("description")}</p>
        </div>

        <FullHDImage
          src={t("image.src")}
          alt={t("image.alt")}
          className="size-full rounded-lg"
        />
      </Container>
    </Section>
  );
}
