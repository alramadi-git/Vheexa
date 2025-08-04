import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { getTranslations, getLocale } from "next-intl/server";

type TOptions = Array<{
  locale: string;
  flag: string;
  label: string;
}>;

const ID = "language-selector";

export default async function LocaleSelector() {
  const [t, locale] = await Promise.all([
    getTranslations("app.page.header.nav.language"),
    getLocale(),
  ]);

  const options: TOptions = t.raw("options");

  return (
    <div className="border-input bg-background relative rounded-md border shadow-xs transition-[color,box-shadow]">
      <label
        htmlFor={ID}
        className="text-foreground block px-3 pt-2 font-medium"
      >
        {t("label")}
      </label>
      <Select defaultValue={locale}>
        <SelectTrigger
          id={ID}
          className="w-full rounded-t-none border-none bg-transparent shadow-none focus:ring-0 focus:ring-offset-0"
        >
          <SelectValue placeholder={t("placeholder")} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.locale}
              value={option.locale}
              className="flex items-center"
            >
              <span className="size-4">{option.flag}</span>
              <span>{option.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
