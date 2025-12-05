"use client";

import { useTranslations } from "next-intl";

import { Container, Section } from "@/components/locals/blocks/typography";
import { FullHDImage } from "@/components/locals/blocks/images";

export default function NotFound() {
  const tNotFound = useTranslations("app.not-found");

  return (
    <Section className="h-dvh">
      <Container className="flex size-full items-center justify-center">
        <FullHDImage
          src={tNotFound("illustration.url")}
          alt={tNotFound("illustration.alternate")}
          className="size-full object-contain"
        />
      </Container>
    </Section>
  );
}
