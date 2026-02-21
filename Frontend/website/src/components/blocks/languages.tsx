"use client";

import { ComponentProps, Fragment } from "react";
import { useLocale, useTranslations } from "next-intl";

import { cn } from "@/utilities/cn";

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
import { LinkLocale } from "@/components/blocks/links";

type tContinent = {
  label: string;
  countries: tCountry[];
};
type tCountry = {
  direction: string;
  locale: string;
  "country-code": string;
  label: string;
};

type tLanguagesProps = Omit<ComponentProps<"div">, "children"> & {
  align?: ComponentProps<typeof PopoverContent>["align"];
};

export default function Languages({
  align = "start",
  className,
  ...props
}: tLanguagesProps) {
  const locale = useLocale();
  const tLanguages = useTranslations("components.languages");

  const continents: tContinent[] = tLanguages.raw("continents");

  const language = continents
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
            <span className="text-lg leading-none">
              {language?.["country-code"]}
            </span>
            <p>{language?.label}</p>

            <LuChevronDown
              size={16}
              className="text-muted-foreground/80 ms-auto shrink-0"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align={align}
          className="border-input w-full min-w-(--radix-popper-anchor-width) rounded p-0"
        >
          <Command className="rounded">
            <CommandInput placeholder={tLanguages("placeholder")} />
            <CommandList>
              <CommandEmpty>{tLanguages("when-empty")}</CommandEmpty>
              {continents.map((continent) => (
                <CommandGroup key={continent.label} heading={continent.label}>
                  {continent.countries.map((country) => (
                    <Fragment key={country.label}>
                      {country.locale !== language?.locale && (
                        <CommandItem
                          asChild
                          value={country.label}
                          className="cursor-pointer gap-2.5 rounded"
                        >
                          <LinkLocale locale={country.locale}>
                            <span className="text-lg leading-none">
                              {country["country-code"]}
                            </span>

                            <span
                              dir={country.direction}
                              className="line-clamp-1"
                            >
                              {country.label}
                            </span>
                            {language?.locale === country.locale && (
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
