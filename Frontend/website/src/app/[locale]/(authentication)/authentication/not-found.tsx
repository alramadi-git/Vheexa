"use client";

import { useTranslations } from "next-intl";

import { Section } from "@/components/locals/blocks/typography";

import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/links";

export default function NotFound() {
  const tNotFound = useTranslations("app.user.authentication.not-found");

  return (
    <Section className="h-full space-y-6">
      <h2 className="text-5xl font-semibold">{tNotFound("subtitle")}</h2>
      <h3 className="mb-1.5 text-3xl font-semibold">{tNotFound("title")}</h3>
      <p className="text-muted-foreground max-w-sm">
        {tNotFound("description")}
      </p>
      <Button asChild size="lg" className="rounded-lg text-base">
        <Link href="/authentication/login">{tNotFound("go-back-to-login")}</Link>
      </Button>
    </Section>
  );
}
