"use client";

import { useTranslations } from "next-intl";

import { Container, Section } from "@/components/locals/blocks/typography";
import { FullHDImage } from "@/components/locals/blocks/image";

export default function NotFound() {
  const t = useTranslations("app.not-found");
  return (
    <Section className="h-dvh">
      <Container className="flex size-full items-center justify-center">
        <FullHDImage
          src={t("illustration.src")}
          alt={t("illustration.alt")}
          className="size-full object-contain"
        />
      </Container>
    </Section>
  );
}
