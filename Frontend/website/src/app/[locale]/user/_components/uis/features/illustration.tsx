import { getTranslations } from "next-intl/server";
import { FullHDImage } from "@/components/locals/blocks/image";

export default async function Illustration() {
  const t = await getTranslations("app.user.page.features.illustration");

  return (
    <div className="-mx-4 mask-b-from-75% mask-b-to-95% mask-l-from-75% mask-l-to-95% pt-3 pr-3 md:-mx-12">
      <div className="perspective-midrange">
        <div className="rotate-x-6 -skew-2">
          <div className="aspect-88/36">
            <FullHDImage
              src={t("src")}
              alt={t("alt")}
              className="h-[750px] rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
