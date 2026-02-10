"use client";

import { useTranslations } from "next-intl";

import { Section } from "@/components/locals/blocks/typography";

import { FullHDImage } from "@/components/locals/blocks/images";

import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/links";

export default function NotFound() {
  const tNotFound = useTranslations("app.partner.not-found");

  return (
    <Section className="grid h-screen grid-cols-1 items-center lg:grid-cols-2">
      <div className="space-y-6 px-4 py-8 text-center">
        <h2 className="text-5xl font-semibold">{tNotFound("subtitle")}</h2>
        <h3 className="mb-1.5 text-3xl font-semibold">{tNotFound("title")}</h3>
        <p className="text-muted-foreground mx-auto max-w-sm">
          {tNotFound("description")}
        </p>

        <Button asChild size="lg" className="rounded-lg text-base">
          <Link href="/partner/dashboard">
            {tNotFound("go-back-to-dashboard")}
          </Link>
        </Button>
      </div>

      <div className="relative size-full max-lg:hidden">
        <div className="bg-primary size-full rounded-2xl dark:brightness-[0.2] dark:grayscale"></div>
        <FullHDImage
          src={tNotFound("illustration.url")}
          alt={tNotFound("illustration.alternate")}
          className="absolute top-1/2 left-1/2 h-64 -translate-x-1/2 -translate-y-1/2 object-contain dark:brightness-90"
        />
      </div>
    </Section>
  );
}
