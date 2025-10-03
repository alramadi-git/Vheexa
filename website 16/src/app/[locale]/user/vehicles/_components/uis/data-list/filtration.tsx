"use client";

import type { TNullable, TUndefinable } from "@/types/nullish";

import { format } from "date-fns";
import { cn } from "@/utilities/cn";

import { useId, useState } from "react";

import { CalendarIcon } from "lucide-react";
import { Label } from "@/components/shadcn/label";
import { Button } from "@/components/shadcn/button";
import { Calendar } from "@/components/shadcn/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { DropdownNavProps, DropdownProps } from "react-day-picker";

export function Search() {}

export function PickupCalendar() {
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
        <Label htmlFor={id}>Date picker</Label>
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

export function Category() {}
export function Sort() {}

export default function Filtration() {
  return (
    <div>
      {/* <Search /> */}
      <PickupCalendar />
      {/* <Category />
      <Sort /> */}
    </div>
  );
}
