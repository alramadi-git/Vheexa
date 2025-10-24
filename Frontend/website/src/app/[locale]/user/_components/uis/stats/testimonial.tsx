import { getTranslations } from "next-intl/server";

import { Blockquote } from "@/components/locals/blocks/typography";
import { FullHDImage } from "@/components/locals/blocks/image";

export default async function Testimonial() {
  const t = await getTranslations("app.user.page.stats.testimonial");

  return (
    <div>
      <Blockquote>{t("quote")}</Blockquote>
      <div className="mt-6 flex gap-2">
        <FullHDImage
          src={t("author.avatar.src")}
          alt={t("author.avatar.alt")}
          className="size-6 rounded-sm"
        />
        <cite className="block font-medium not-italic">
          {t("author.name")}, {t("author.role")}
        </cite>
      </div>
    </div>
  );
}
