"use client";

import {
  ComponentProps,
  ReactNode,
  ReactElement,
  forwardRef,
  useState,
  useEffect,
  useImperativeHandle,
} from "react";

import { tUndefinable } from "@/types/nullish";
import { tResponseManyService } from "@/services/service";

import { useQuery } from "@tanstack/react-query";

import { useDebouncedCallback } from "use-debounce";

import { LuArrowRight, LuChevronsUpDown } from "react-icons/lu";

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

import { Button } from "@/components/shadcn/button";

import { Skeleton } from "@/components/shadcn/skeleton";

type tOption = {
  value: string;
  label: string;
};

type tFieldFreeSearchableSelectProps<gtOption extends tOption> = {
  inputProps: ComponentProps<typeof CommandInput>;
  value: string;
  list: gtOption[];
  triggerRender: () => ReactNode;
  itemRender: (item: gtOption) => ReactNode;
  whenEmptyRender: () => ReactNode;
  onSelect: (string: string) => void;
};
function FieldFreeSearchableSelect<gtOption extends tOption>({
  triggerRender,
  value,
  inputProps,
  list,
  itemRender,
  whenEmptyRender,
  onSelect,
}: tFieldFreeSearchableSelectProps<gtOption>) {
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
              <LuArrowRight
                size={16}
                className="text-muted-foreground/80 hover:text-primary/80"
              />
            </button>
          </CommandInput>
          <CommandList>
            <CommandEmpty>{whenEmptyRender()}</CommandEmpty>
            {list.map((item) => (
              <CommandItem
                asChild
                key={item.value}
                value={item.label}
                className="cursor-pointer gap-2.5 rounded"
                onSelect={() => _onSelect(item.label)}
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

type tFieldAsyncSelectRef = {
  reset: () => void;
};
type tFieldAsyncSelectProps = {
  isInvalid?: boolean;
  id: string;
  placeholder: string;
  value?: tOption;
  triggerRender: (value: tOption) => ReactNode;
  cacheKey: string;
  fetch: (
    search: string,
    page: number,
  ) => Promise<tResponseManyService<tOption>>;
  inputProps?: ComponentProps<typeof CommandInput>;
  whenEmptyRender: () => ReactNode;
  optionRender: (item: tOption) => ReactElement<"button">;
  whenErrorRender: () => ReactNode;
  onSelect?: (option: tOption) => void;
};

const FieldAsyncSelect = forwardRef<
  tFieldAsyncSelectRef,
  tFieldAsyncSelectProps
>(
  (
    {
      isInvalid,
      id,
      placeholder,
      value: valueProp,
      triggerRender,
      cacheKey,
      fetch,
      inputProps,
      whenEmptyRender,
      optionRender,
      whenErrorRender,
      onSelect,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [value, setValue] = useState<tUndefinable<tOption>>(valueProp);

    const {
      isLoading,
      data: result,
      refetch: refetchQuery,
    } = useQuery({
      enabled: false,
      placeholderData: (result) => result,
      queryKey: ["async-select", cacheKey, search, page],
      queryFn: async () => fetch(search, page),
    });

    function reset() {
      setValue(undefined);
    }

    useImperativeHandle(ref, () => ({
      reset,
    }));

    useEffect(() => {
      refetchQuery();
    }, []);

    const refetch = useDebouncedCallback(() => {
      refetchQuery();
    }, 500);

    function Select(option: tOption) {
      setIsOpen(false);

      setSearch("");

      setValue(option);
      onSelect?.(option);
    }

    function onValueChange(search: string) {
      setSearch(search);
      refetch();
    }

    console.log(isLoading);
    console.log(result);

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            aria-invalid={isInvalid}
            id={id}
            variant="outline"
            className="justify-between text-start"
          >
            {value ? (
              triggerRender(value)
            ) : (
              <span
                aria-invalid={isInvalid}
                className="text-muted-foreground aria-invalid:text-destructive truncate"
              >
                {isInvalid}
                {placeholder}
              </span>
            )}
            <LuChevronsUpDown size={16} className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="border-input max-w-[var(--radix-popper-anchor-width)] min-w-[var(--radix-popper-anchor-width)] rounded p-0"
        >
          <Command className="rounded">
            <CommandInput
              {...inputProps}
              value={search}
              onValueChange={onValueChange}
            />
            <CommandList className="flex flex-col p-3">
              <CommandEmpty className="py-0">
                {isLoading ? (
                  <FieldAsyncSelectLoading />
                ) : result?.isSuccess ? (
                  whenEmptyRender()
                ) : (
                  whenErrorRender()
                )}
              </CommandEmpty>
              {result?.isSuccess &&
                result.data.map((option) => (
                  <CommandItem
                    asChild
                    key={option.value}
                    value={option.label}
                    className="w-full cursor-pointer gap-2.5 rounded"
                    onSelect={() => Select(option)}
                  >
                    {optionRender(option)}
                  </CommandItem>
                ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

FieldAsyncSelect.displayName = "FieldDynamicSelect";

function FieldAsyncSelectLoading() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-8" />
      <Skeleton className="h-8" />
      <Skeleton className="h-8" />
      <Skeleton className="h-8" />
      <Skeleton className="h-8" />
    </div>
  );
}

export type { tFieldAsyncSelectRef };
export { FieldFreeSearchableSelect, FieldAsyncSelect };
