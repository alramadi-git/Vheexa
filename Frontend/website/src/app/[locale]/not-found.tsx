"use client";

import { useTranslations } from "next-intl";

import { Section } from "@/components/locals/blocks/typography";

import { FullHDImage } from "@/components/locals/blocks/images";

import { Button } from "@/components/shadcn/button";
import { Link } from "@/components/locals/blocks/links";

export default function NotFound() {
  const tNotFound = useTranslations("app.not-found");

  return (
    <Section className="h-fullscreen grid grid-cols-1 items-center lg:grid-cols-2">
      <div className="space-y-6 px-4 py-8 text-center">
        <h2 className="text-5xl font-semibold">{tNotFound("title")}</h2>
        <h3 className="mb-1.5 text-3xl font-semibold">
          {tNotFound("subtitle")}
        </h3>
        <p className="text-muted-foreground mx-auto max-w-sm">
          {tNotFound("description")}
        </p>

        <Button asChild size="lg" className="rounded-lg text-base">
          <Link href="/">{tNotFound("go-back-to-home")}</Link>
        </Button>
      </div>

      <div className="relative size-full max-lg:hidden">
        <div className="bg-primary dark:brightness-[0.2] dark:grayscale size-full rounded-2xl"></div>
        <FullHDImage
          src={tNotFound("illustration.url")}
          alt={tNotFound("illustration.alternate")}
          className="absolute top-1/2 dark:brightness-90  left-1/2 h-64 -translate-x-1/2 -translate-y-1/2 object-contain"
        />
      </div>
    </Section>
  );
}
