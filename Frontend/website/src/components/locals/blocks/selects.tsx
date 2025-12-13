"use client";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/shadcn/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from "@/components/shadcn/command";
import { Key, ComponentProps, ReactNode, useState, useEffect } from "react";
import { Button } from "@/components/shadcn/button";

type tDataBase = {
  key: Key;
  value: string;
};
type tFreeSearchableSelectProps<tData extends tDataBase> = {
  triggerRender: () => ReactNode;
  value: string;
  inputProps: ComponentProps<typeof CommandInput>;
  list: tData[];
  itemRender: (item: tData) => ReactNode;
  whenNoResultRender: () => ReactNode;
  onSelect: (string: string) => void;
};
function FreeSearchableSelect<tData extends tDataBase>({
  triggerRender,
  value,
  inputProps,
  list,
  itemRender,
  whenNoResultRender,
  onSelect,
}: tFreeSearchableSelectProps<tData>) {
  const [inputValue, setInputValue] = useState<string>(value);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  function onEnter() {
    _onSelect(inputValue);
    setIsOpen(false);
  }
  function _onSelect(value: string) {
    onSelect(value);
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{triggerRender()}</PopoverTrigger>
      <PopoverContent className="border-input w-full min-w-[var(--radix-popper-anchor-width)] rounded p-0">
        <Command className="rounded">
          <CommandInput
            value={inputValue}
            onValueChange={(value) => setInputValue(value)}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                onEnter();
                e.currentTarget.blur();
              }
            }}
            {...inputProps}
          />
          <CommandList>
            <CommandEmpty>{whenNoResultRender()}</CommandEmpty>
            {list.map((item) => (
              <CommandItem
                asChild
                key={item.key}
                value={item.value}
                className="cursor-pointer gap-2.5 rounded"
                onSelect={() => _onSelect(item.value)}
              >
                {itemRender(item)}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export type { tFreeSearchableSelectProps as tSearchableSelectProps };
export { FreeSearchableSelect as SearchableSelect };
