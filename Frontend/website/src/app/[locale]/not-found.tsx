"use client";

import { FullHDImage } from "@/components/locals/blocks/image";
import { Link } from "@/components/locals/blocks/link";
import { Button } from "@/components/shadcn/button";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("app.not-found");
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center">
      <FullHDImage
        src={t("illustration.src")}
        alt={t("illustration.alt")}
        className="size-1/2"
      />
      <div>
        <h1 className="text-4xl">{t("title")}</h1>
        <Button variant="link" className="p-0 font-normal text-2xl text-blue-500">
          <Link href={t("link.href")}>{t("link.label")} </Link>
        </Button>
      </div>
    </div>
  );
}
