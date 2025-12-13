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
import { LuArrowRight } from "react-icons/lu";

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
  }
  function _onSelect(value: string) {
    onSelect(value);
    setIsOpen(false);
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
                e.currentTarget.blur();
                onEnter();
              }
            }}
            {...inputProps}
          >
            <button type="button" onClick={onEnter} className="mr-2">
              <LuArrowRight size={16} className="text-muted-foreground/80 hover:text-primary/80" />
            </button>
          </CommandInput>
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
