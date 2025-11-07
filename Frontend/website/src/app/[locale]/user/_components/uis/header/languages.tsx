"use client";

import { cn } from "@/utilities/cn";

import { useLocale, useTranslations } from "next-intl";
import { type ComponentProps, Fragment } from "react";

import { LuCheck, LuChevronDown } from "react-icons/lu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadcn/command";
import { Button } from "@/components/shadcn/button";
import { LinkLocale } from "@/components/locals/blocks/link";

type tContinent = {
  label: string;
  countries: tCountry[];
};
type tCountry = {
  dir: string;
  locale: string;
  flag: string;
  label: string;
};

type tLanguagesProps = Omit<ComponentProps<"div">, "children"> & {
  align?: ComponentProps<typeof PopoverContent>["align"];
};

export default function Languages({
  align = "start" ,
  className,
  ...props
}: tLanguagesProps) {
  const t = useTranslations("app.user.layout.header.languages");
  const locale = useLocale();

  const continents: tContinent[] = t.raw("continents");
  const selectedLanguage = continents
    .find(
      (continent) =>
        continent.countries.find((country) => country.locale === locale) !==
        undefined,
    )
    ?.countries.find((country) => country.locale === locale);

  return (
    <div {...props} className={cn("*:not-first:mt-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="bg-background hover:bg-background border-input w-full justify-start rounded px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
          >
            <span className="relative h-[13px] w-[19px] text-lg leading-none">
              <span className="absolute top-1/2 left-1/2 h-[13px] w-[19px] -translate-1/2">
                {selectedLanguage?.flag}
              </span>
            </span>
            <p>{selectedLanguage?.label}</p>

            <LuChevronDown
              size={16}
              className="text-muted-foreground/80 ms-auto shrink-0"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align={align}
          className="border-input w-full min-w-[var(--radix-popper-anchor-width)] rounded p-0"
        >
          <Command className="rounded">
            <CommandInput placeholder={t("placeholder")} />
            <CommandList>
              <CommandEmpty>{t("when-empty")}</CommandEmpty>
              {continents.map((continent) => (
                <CommandGroup key={continent.label} heading={continent.label}>
                  {continent.countries.map((country) => (
                    <Fragment key={country.label}>
                      {country.locale !== selectedLanguage?.locale && (
                        <CommandItem
                          asChild
                          value={country.label}
                          className="cursor-pointer gap-2.5 rounded"
                        >
                          <LinkLocale locale={country.locale}>
                            <span className="relative h-[13px] w-[19px] text-lg leading-none">
                              <span className="absolute top-1/2 left-1/2 h-[13px] w-[19px] -translate-1/2">
                                {country.flag}
                              </span>
                            </span>

                            <span dir={country.dir} className="line-clamp-1">
                              {country.label}
                            </span>
                            {selectedLanguage?.locale === country.locale && (
                              <LuCheck size={16} className="ml-auto" />
                            )}
                          </LinkLocale>
                        </CommandItem>
                      )}
                    </Fragment>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
