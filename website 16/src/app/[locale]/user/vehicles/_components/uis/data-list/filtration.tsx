"use client";

import type { TUndefinable } from "@/types/nullish";

import { Pagination } from "@/classes/api";
import { CategoryQuery, SortingQuery } from "@/services/vehicle/vehicle";

import { cn } from "@/utilities/cn";

import { JSX, useId, useState } from "react";
import {
  ArrowRightIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";

import { Label } from "@/components/shadcn/label";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { Card } from "@/components/shadcn/card";

import { format } from "date-fns";
import { Calendar } from "@/components/shadcn/calendar";
import { DropdownNavProps, DropdownProps } from "react-day-picker";

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
  CommandSeparator,
} from "@/components/shadcn/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";

import PaginationFilter from "@/components/locals/blocks/pagination";

function SearchFilter() {
  return (
    <div className="w-full *:not-first:mt-2">
      <div className="relative">
        <Input
          className="peer px-9"
          placeholder="What are you waiting search you vehicle..."
          type="search"
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Submit search"
          type="submit"
        >
          <ArrowRightIcon size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

const categories: Array<CategoryQuery> = [
  new CategoryQuery("00a1b2c3-d4e5-4f6a-b7c8-d9e0f1a2b3c4", "All"),
  new CategoryQuery("1a2b3c4d-5e6f-4789-a0b1-c2d3e4f5a6b7", "Car"),
  new CategoryQuery("2b3c4d5e-6f7a-4bcd-b1c2-d3e4f5a6b7c8", "Truck"),
  new CategoryQuery("3c4d5e6f-7a8b-4def-c2d3-e4f5a6b7c8d9", "Bus"),
  new CategoryQuery("4d5e6f7a-8b9c-4f01-d3e4-f5a6b7c8d9e0", "Motorcycle"),
  new CategoryQuery("5e6f7a8b-9c0d-4abc-e4f5-a6b7c8d9e0f1", "Bicycle"),
  new CategoryQuery("6f7a8b9c-0d1e-4fed-f5a6-b7c8d9e0f1a2", "Boat"),
  new CategoryQuery("7a8b9c0d-1e2f-40bc-a6b7-c8d9e0f1a2b3", "Yacht"),
];
function CategoryFilter() {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<CategoryQuery["ID"]>(categories[0].ID);

  return (
    <div className="*:not-first:mt-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
          >
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {value
                ? categories.find((category) => category.ID === value)?.Label
                : "Select organization"}
            </span>
            <ChevronDownIcon
              size={16}
              className="text-muted-foreground/80 shrink-0"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Find organization" />
            <CommandList>
              <CommandEmpty>No organization found.</CommandEmpty>
              <CommandGroup>
                {categories.map((category) => (
                  <CommandItem
                    key={category.ID}
                    value={category.ID}
                    onSelect={(categoryID) => {
                      setValue(
                        categoryID === value ? categories[0].ID : categoryID,
                      );
                      setOpen(false);
                    }}
                  >
                    {category.Label}
                    {value === category.ID && (
                      <CheckIcon size={16} className="ml-auto" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <Button
                  variant="ghost"
                  className="w-full justify-start font-normal"
                >
                  <PlusIcon
                    size={16}
                    className="-ms-2 opacity-60"
                    aria-hidden="true"
                  />
                  New organization
                </Button>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

const sortingOptions = [
  new SortingQuery("00a1b2c3-d4e5-4f6a-b7c8-d9e0f1a2b3c4", "Most Popular"),
  new SortingQuery("4e12f98b-1d24-46a7-8b3c-73bca8c4e921", "Best Price"),
  new SortingQuery("f6d2c90e-3a6f-4c47-8ab1-0d34b87f21c5", "Nearest"),
  new SortingQuery("1a2b3c4d-5e6f-4789-a0b1-c2d3e4f5a6b7", "Newest"),
];
function SortingFilter() {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<SortingQuery["ID"]>(sortingOptions[0].ID);

  return (
    <div className="*:not-first:mt-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
          >
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {value
                ? sortingOptions.find((sorting) => sorting.ID === value)?.Label
                : "Select organization"}
            </span>
            <ChevronDownIcon
              size={16}
              className="text-muted-foreground/80 shrink-0"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Find organization" />
            <CommandList>
              <CommandEmpty>No organization found.</CommandEmpty>
              <CommandGroup>
                {sortingOptions.map((sorting) => (
                  <CommandItem
                    key={sorting.ID}
                    value={sorting.ID}
                    onSelect={(sortingID) => {
                      setValue(
                        sortingID === value ? sortingOptions[0].ID : sortingID,
                      );
                      setOpen(false);
                    }}
                  >
                    {sorting.Label}
                    {value === sorting.ID && (
                      <CheckIcon size={16} className="ml-auto" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <Button
                  variant="ghost"
                  className="w-full justify-start font-normal"
                >
                  <PlusIcon
                    size={16}
                    className="-ms-2 opacity-60"
                    aria-hidden="true"
                  />
                  New organization
                </Button>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function PickupCalendarFilter() {
  const id = useId();
  const [date, setDate] = useState<TUndefinable<Date>>();

  function handleCalendarChange(
    _value: string | number,
    _e: React.ChangeEventHandler<HTMLSelectElement>,
  ) {
    const _event = {
      target: {
        value: String(_value),
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    _e(_event);
  }

  return (
    <div>
      <div className="*:not-first:mt-2">
        <Label htmlFor={id}>Pickup Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id={id}
              variant={"outline"}
              className="group bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
            >
              <span
                className={cn("truncate", !date && "text-muted-foreground")}
              >
                {date ? format(date, "PPP") : "Pick a date"}
              </span>
              <CalendarIcon
                size={16}
                className="text-muted-foreground/80 group-hover:text-foreground shrink-0 transition-colors"
                aria-hidden="true"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              classNames={{
                month_caption: "mx-0",
              }}
              captionLayout="dropdown"
              defaultMonth={new Date()}
              startMonth={new Date()}
              hideNavigation
              components={{
                DropdownNav: (props: DropdownNavProps) => {
                  return (
                    <div className="flex w-full items-center gap-2">
                      {props.children}
                    </div>
                  );
                },
                Dropdown: (props: DropdownProps) => {
                  return (
                    <Select
                      value={String(props.value)}
                      onValueChange={(value) => {
                        if (props.onChange) {
                          handleCalendarChange(value, props.onChange);
                        }
                      }}
                    >
                      <SelectTrigger className="h-8 w-fit font-medium first:grow">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-[min(26rem,var(--radix-select-content-available-height))]">
                        {props.options?.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={String(option.value)}
                            disabled={option.disabled}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  );
                },
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
function DropoffCalendarFilter() {
  const id = useId();
  const [date, setDate] = useState<TUndefinable<Date>>();

  function handleCalendarChange(
    _value: string | number,
    _e: React.ChangeEventHandler<HTMLSelectElement>,
  ) {
    const _event = {
      target: {
        value: String(_value),
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    _e(_event);
  }

  return (
    <div>
      <div className="*:not-first:mt-2">
        <Label htmlFor={id}>Dropoff Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id={id}
              variant={"outline"}
              className="group bg-background hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]"
            >
              <span
                className={cn("truncate", !date && "text-muted-foreground")}
              >
                {date ? format(date, "PPP") : "Pick a date"}
              </span>
              <CalendarIcon
                size={16}
                className="text-muted-foreground/80 group-hover:text-foreground shrink-0 transition-colors"
                aria-hidden="true"
              />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              classNames={{
                month_caption: "mx-0",
              }}
              captionLayout="dropdown"
              defaultMonth={new Date()}
              startMonth={new Date()}
              hideNavigation
              components={{
                DropdownNav: (props: DropdownNavProps) => {
                  return (
                    <div className="flex w-full items-center gap-2">
                      {props.children}
                    </div>
                  );
                },
                Dropdown: (props: DropdownProps) => {
                  return (
                    <Select
                      value={String(props.value)}
                      onValueChange={(value) => {
                        if (props.onChange) {
                          handleCalendarChange(value, props.onChange);
                        }
                      }}
                    >
                      <SelectTrigger className="h-8 w-fit font-medium first:grow">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-[min(26rem,var(--radix-select-content-available-height))]">
                        {props.options?.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={String(option.value)}
                            disabled={option.disabled}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  );
                },
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

type TFiltrationProps = {
  list: JSX.Element;
  pagination: Pagination;
};
export default function Filtration(props: TFiltrationProps) {
  return (
    <div className="space-y-3.5">
      <div className="flex gap-3.5">
        <Card className="relative min-h-full w-1/4 rounded-md">
          <div className="sticky top-[125px] left-0"></div>
        </Card>

        <div className="w-full space-y-3.5">
          <div className="flex gap-3.5">
            <SearchFilter />
            <CategoryFilter />
            <SortingFilter />
          </div>

          {props.list}
        </div>
      </div>

      <PaginationFilter pagination={props.pagination} />
    </div>
  );
}
