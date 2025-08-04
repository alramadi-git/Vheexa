"use client";

import { ComponentProps, Fragment, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

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
import { LuCheck, LuChevronDown } from "react-icons/lu";
import NextIntlLinkLocale from "@/components/locals/blocks/next-intl-link-locale";
import { LOCALE } from "@/i18n/routing";
import { TNullable } from "@/types/nullish";
import { cn } from "@/utilities/cn";

type TContinent = {
  label: string;
  countries: Array<TCountry>;
};
type TCountry = {
  flag: string;
  locale: LOCALE;
  label: string;
};

type TLocaleSelector = {
  props: Omit<ComponentProps<"div">, "children">;
};

export default function LocaleSelector({
  className,
  ...props
}: TLocaleSelector["props"]) {
  const t = useTranslations("app.page.header.nav");
  const locale = useLocale();

  const continents: Array<TContinent> = t.raw("continents");

  // const [open, setOpen] = useState<boolean>(false);
  const selectedLocale = useMemo<TCountry>(() => {
    let selectedLocale: TNullable<TCountry> = null;

    for (const continent of continents) {
      if (selectedLocale !== null) break;

      for (const country of continent.countries)
        if (country.locale === locale) {
          selectedLocale = country;
          break;
        }
    }

    return selectedLocale!;
  }, [continents, locale]);

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
                {selectedLocale.flag}
              </span>
            </span>
            {selectedLocale.label}

            <LuChevronDown
              size={16}
              className="text-muted-foreground/80 ms-auto shrink-0"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border-input w-full min-w-[var(--radix-popper-anchor-width)] rounded p-0"
          align="start"
        >
          <Command className="rounded">
            <CommandInput placeholder="Search your language..." />
            <CommandList>
              <CommandEmpty>No such a language found.</CommandEmpty>
              {continents.map((continent) => (
                <CommandGroup key={continent.label} heading={continent.label}>
                  {continent.countries.map((country) => (
                    <Fragment key={country.label}>
                      {country.locale !== selectedLocale.locale && (
                        <CommandItem
                          asChild
                          value={country.label}
                          className="cursor-pointer gap-2.5 rounded"
                        >
                          <NextIntlLinkLocale locale={country.locale}>
                            <span className="relative h-[13px] w-[19px] text-lg leading-none">
                              <span className="absolute top-1/2 left-1/2 h-[13px] w-[19px] -translate-1/2">
                                {country.flag}
                              </span>
                            </span>
                            {country.label}
                            {selectedLocale.locale === country.locale && (
                              <LuCheck size={16} className="ml-auto" />
                            )}
                          </NextIntlLinkLocale>
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
