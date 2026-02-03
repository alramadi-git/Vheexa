"use client";

import { tUndefinable } from "@/types/nullish";

import {
  Ref,
  ReactNode,
  ReactElement,
  JSX,
  forwardRef,
  useState,
  useImperativeHandle,
  Fragment,
} from "react";

import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import { useTranslations } from "next-intl";

import { cn } from "@/utilities/cn";

import {
  LuChevronsUpDown,
  LuX,
  LuChevronFirst,
  LuChevronLeft,
  LuChevronRight,
  LuChevronLast,
} from "react-icons/lu";

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
  CommandGroup,
  CommandItem,
} from "@/components/shadcn/command";

import { ClsPagination } from "./pagination";

import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
  PaginationButton,
} from "@/components/shadcn/pagination";

import { Skeleton } from "@/components/shadcn/skeleton";

import { Badge } from "@/components/shadcn/badge";
import { Button } from "@/components/shadcn/button";
import { tPaginatedSuccessService } from "@/services/success";
import { tErrorService } from "@/services/error";
import { tPaginatedSuccessModel } from "@/models/success";

type tGroup<gtOption extends tOption> = {
  value: string;
  options: gtOption[];
};

type tOption = {
  value: string;
  label: string;
};

type tFieldSelectRef<gtOption extends tOption> = {
  setValue: (value: tUndefinable<gtOption>) => void;
  reset: (defaultValue?: gtOption) => void;
};
type tFieldSelectProps<gtOption extends tOption> = {
  id?: string;
  isInvalid?: boolean;
  placeholder?: string;
  defaultValue?: gtOption;
  options: gtOption[];
  optionRender: (
    option: gtOption,
    isSelected: boolean,
  ) => ReactElement<"button">;
  onSelect?: (option: tUndefinable<gtOption>) => void;
};

const FieldSelect = forwardRef(
  <gtOption extends tOption>(
    {
      id,
      isInvalid,
      placeholder,
      defaultValue: defaultOptionProp,
      options,
      optionRender,
      onSelect,
    }: tFieldSelectProps<gtOption>,
    ref: Ref<tFieldSelectRef<gtOption>>,
  ) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [value, setValue] =
      useState<tUndefinable<gtOption>>(defaultOptionProp);

    function imperativeSetValue(value: tUndefinable<gtOption>) {
      setValue(value);
    }

    function imperativeReset(defaultValue?: gtOption) {
      setValue(defaultValue);
    }

    useImperativeHandle(ref, () => ({
      setValue: imperativeSetValue,
      reset: imperativeReset,
    }));

    function select(option: gtOption) {
      if (value === undefined) {
        setValue(option);
        onSelect?.(option);

        setIsOpen(false);

        return;
      }

      if (option.value === value.value) {
        setValue(undefined);
        onSelect?.(undefined);

        setIsOpen(false);

        return;
      }

      setValue(option);
      onSelect?.(option);

      setIsOpen(false);
    }

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
              value.label
            ) : (
              <span
                aria-invalid={isInvalid}
                className="text-muted-foreground aria-invalid:text-destructive/80 truncate"
              >
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
            <CommandList className="flex flex-col p-1">
              {options.map((option) => (
                <CommandItem
                  asChild
                  key={option.value}
                  value={option.label}
                  className="w-full cursor-pointer gap-2.5 rounded"
                  onSelect={() => select(option)}
                >
                  {optionRender(option, option.value === value?.value)}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
) as <gtOption extends tOption>(
  props: tFieldSelectProps<gtOption> & {
    ref?: Ref<tFieldSelectRef<gtOption>>;
  },
) => JSX.Element;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
FieldSelect.displayName = "FieldSelect";

type tFieldMultiSelectRef<gtOption extends tOption> = {
  setValue: (values: gtOption[]) => void;
  reset: (defaultValues?: gtOption[]) => void;
};
type tFieldMultiSelectProps<
  gtGroup extends tGroup<gtOption>,
  gtOption extends tOption,
> = {
  id?: string;
  isInvalid?: boolean;
  placeholder?: string;
  maxShownOptions?: number;
  defaultValues?: gtOption[];
  groups: gtGroup[];
  searchPlaceholder?: string;
  groupRender: (group: gtGroup) => ReactNode;
  optionRender: (
    option: gtOption,
    isSelected: boolean,
  ) => ReactElement<"button">;
  onToggle?: (values: gtOption[]) => void;
};

const FieldMultiSelect = forwardRef(
  <gtGroup extends tGroup<gtOption>, gtOption extends tOption>(
    {
      id,
      isInvalid,
      maxShownOptions = 3,
      placeholder,
      defaultValues = [],
      groups,
      searchPlaceholder,
      groupRender,
      optionRender,
      onToggle,
    }: tFieldMultiSelectProps<gtGroup, gtOption>,
    ref: React.Ref<tFieldMultiSelectRef<gtOption>>,
  ) => {
    const tFieldMultiSelect = useTranslations("components.fields.multiselect");

    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const [values, setValues] = useState<gtOption[]>(defaultValues);

    const visibleValues: gtOption[] = isExpanded
      ? values
      : values.slice(0, maxShownOptions);

    const hiddenCount = values.length - visibleValues.length;

    function imperativeSetValue(options: gtOption[]) {
      setValues(options);
    }

    function imperativeReset(defaultValues: gtOption[] = []) {
      setValues(defaultValues);
    }

    useImperativeHandle(ref, () => ({
      setValue: imperativeSetValue,
      reset: imperativeReset,
    }));

    function toggle(option: gtOption, isSelected: boolean) {
      if (isSelected) {
        const options = values.filter((value) => value !== option);

        setValues(options);
        onToggle?.(options);

        return;
      }

      const options = [...values, option];

      setValues(options);
      onToggle?.(options);
    }

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            aria-invalid={isInvalid}
            aria-expanded={isOpen}
            id={id}
            role="combobox"
            variant="outline"
            className="h-auto min-h-8 w-full justify-between hover:bg-transparent"
          >
            <div className="flex flex-wrap items-center gap-1">
              {values.length > 0 ? (
                <Fragment>
                  {visibleValues.flatMap((value) => (
                    <Badge key={value.value} variant="outline">
                      {value.label}
                      <span
                        className="hover:bg-foreground/10 inline-flex size-4 items-center justify-center rounded duration-100"
                        onClick={(event) => {
                          event.stopPropagation();
                          toggle(value, true);
                        }}
                      >
                        <LuX className="size-3" />
                      </span>
                    </Badge>
                  ))}
                  {(visibleValues.length > maxShownOptions ||
                    hiddenCount > 0) && (
                    <Badge
                      variant="outline"
                      onClick={(event) => {
                        event.stopPropagation();
                        setIsExpanded((prev) => !prev);
                      }}
                    >
                      {isExpanded
                        ? tFieldMultiSelect("show-less")
                        : tFieldMultiSelect("show-more", {
                            count: hiddenCount,
                          })}
                    </Badge>
                  )}
                </Fragment>
              ) : (
                <span
                  aria-invalid={isInvalid}
                  className="text-muted-foreground aria-invalid:text-destructive/80 line-clamp-1 text-start text-sm text-wrap"
                >
                  {placeholder}
                </span>
              )}
            </div>
            <LuChevronsUpDown
              aria-invalid={isInvalid}
              className="text-muted-foreground/80 aria-invalid:text-destructive/60 shrink-0"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-(--radix-popper-anchor-width) p-0">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{tFieldMultiSelect("when-empty")}</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.value} heading={groupRender(group)}>
                  {group.options.map((option) => {
                    const isSelected = values.some(
                      (value) => value.value === option.value,
                    );

                    return (
                      <CommandItem
                        asChild
                        key={option.value}
                        value={option.label}
                        className="w-full"
                        onSelect={() => toggle(option, isSelected)}
                      >
                        {optionRender(option, isSelected)}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
) as <gtGroup extends tGroup<gtOption>, gtOption extends tOption>(
  props: tFieldMultiSelectProps<gtGroup, gtOption> & {
    ref?: Ref<tFieldMultiSelectRef<gtOption>>;
  },
) => JSX.Element;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
FieldMultiSelect.displayName = "FieldMultiSelect";

type tFieldFreeSelectRef = {
  setValue: (value: tUndefinable<string>) => void;
  reset: (defaultValue?: string) => void;
};
type tFieldFreeSelectProps = {
  id?: string;
  isInvalid?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  defaultValue?: string;
  options: string[];
  optionRender: (option: string, isSelected: boolean) => ReactElement<"button">;
  onSelect?: (option: tUndefinable<string>) => void;
};

const FieldFreeSelect = forwardRef<tFieldFreeSelectRef, tFieldFreeSelectProps>(
  (
    {
      id,
      isInvalid,
      placeholder,
      searchPlaceholder,
      defaultValue: defaultOptionProp,
      options,
      optionRender,
      onSelect,
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [value, setValue] = useState<tUndefinable<string>>(defaultOptionProp);
    const [search, setSearch] = useState<string>("");

    function imperativeSetValue(value: tUndefinable<string>) {
      setValue(value);
    }

    function imperativeReset(defaultValue?: string) {
      setValue(defaultValue);
    }

    useImperativeHandle(ref, () => ({
      setValue: imperativeSetValue,
      reset: imperativeReset,
    }));

    function select(option: tUndefinable<string>) {
      if (value === undefined) {
        setValue(option);
        onSelect?.(option);

        setIsOpen(false);

        return;
      }

      if (option === value) {
        setValue(undefined);
        onSelect?.(undefined);

        setIsOpen(false);

        return;
      }

      setValue(option);
      onSelect?.(option);

      setIsOpen(false);
    }

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
              value
            ) : (
              <span
                aria-invalid={isInvalid}
                className="text-muted-foreground aria-invalid:text-destructive/80 truncate"
              >
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
              placeholder={searchPlaceholder}
              value={search}
              onKeyDown={(e) => {
                if (e.code === "Enter") {
                  e.currentTarget.blur();
                  select(search);
                }
              }}
              onValueChange={setSearch}
            >
              <button
                aria-hidden={search === ""}
                type="button"
                className="aria-hidden:hidden"
                onClick={() => setSearch("")}
              >
                <LuX
                  size={16}
                  className="text-muted-foreground/80 hover:text-primary/80"
                />
              </button>
            </CommandInput>
            <CommandList
              className={cn("flex flex-col p-1", {
                "p-0": options.length === 0,
              })}
            >
              {options.map((option) => (
                <CommandItem
                  asChild
                  key={option}
                  value={option}
                  className="w-full cursor-pointer gap-2.5 rounded"
                  onSelect={() => select(option)}
                >
                  {optionRender(option, option === value)}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

FieldFreeSelect.displayName = "FieldFreeSelect";

type tFieldAsyncSelectRef<gtOption extends tOption> = {
  change: (value: gtOption) => void;
  reset: (defaultValue?: gtOption) => void;
};
type tFieldAsyncSelectProps<gtOption extends tOption> = {
  id: string;
  isInvalid?: boolean;
  placeholder: string;
  defaultValue?: gtOption;
  valueRender: (value: gtOption) => ReactNode;
  searchPlaceholder: string;
  cacheKey: string;
  fetch: (
    search: string,
    page: number,
  ) => Promise<tPaginatedSuccessService<gtOption> | tErrorService>;
  optionRender: (
    option: gtOption,
    isSelected: boolean,
  ) => ReactElement<"button">;
  whenEmptyRender: () => ReactNode;
  whenErrorRender: () => ReactNode;
  onSelect?: (option?: gtOption) => void;
};

const FieldAsyncSelect = forwardRef(
  <gtOption extends tOption>(
    {
      id,
      isInvalid,
      placeholder,
      defaultValue,
      valueRender,
      searchPlaceholder,
      cacheKey,
      fetch,
      optionRender,
      whenEmptyRender,
      whenErrorRender,
      onSelect,
    }: tFieldAsyncSelectProps<gtOption>,
    ref: Ref<tFieldAsyncSelectRef<gtOption>>,
  ) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [value, setValue] = useState<tUndefinable<gtOption>>(defaultValue);

    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);

    const [debouncedSearch] = useDebounce(search, 300);

    const {
      isLoading,
      isFetching,
      data: result,
    } = useQuery({
      enabled: isOpen,
      placeholderData: (prev) => prev,
      queryKey: ["async-select", cacheKey, debouncedSearch, page],
      queryFn: async () => fetch(debouncedSearch, page),
    });

    function change(value: gtOption) {
      setValue(value);
    }

    function reset(defaultValue?: gtOption) {
      setValue(defaultValue);
    }

    useImperativeHandle(ref, () => ({
      change,
      reset,
    }));

    function Select(option: gtOption) {
      if (value === undefined) {
        setValue(option);
        onSelect?.(option);

        setIsOpen(false);

        return;
      }

      if (option.value === value.value) {
        setValue(undefined);
        onSelect?.(undefined);

        setIsOpen(false);

        return;
      }

      setValue(option);
      onSelect?.(option);

      setIsOpen(false);
    }

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            aria-invalid={isInvalid}
            variant="outline"
            className="justify-between text-start"
          >
            {value ? (
              valueRender(value)
            ) : (
              <span
                aria-invalid={isInvalid}
                className="text-muted-foreground aria-invalid:text-destructive truncate"
              >
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
          <Command shouldFilter={false} className="rounded">
            <CommandInput
              placeholder={searchPlaceholder}
              value={search}
              onValueChange={setSearch}
            />
            <CommandList className="flex flex-col p-3">
              <CommandEmpty className="py-0">
                {isLoading || isFetching ? (
                  <FieldAsyncSelectLoading />
                ) : result?.isSuccess ? (
                  whenEmptyRender()
                ) : (
                  whenErrorRender()
                )}
              </CommandEmpty>
              {isLoading || isFetching
                ? null
                : result?.isSuccess && (
                    <>
                      {result.data.map((option) => (
                        <CommandItem
                          asChild
                          key={option.value}
                          value={option.label}
                          className="w-full cursor-pointer gap-2.5 rounded"
                          onSelect={() => Select(option)}
                        >
                          {optionRender(option, option.value === value?.value)}
                        </CommandItem>
                      ))}
                      <Pagination
                        pagination={result.pagination}
                        onPageChange={setPage}
                      />
                    </>
                  )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
) as <gtOption extends tOption>(
  props: tFieldAsyncSelectProps<gtOption> & {
    ref?: Ref<tFieldAsyncSelectRef<gtOption>>;
  },
) => JSX.Element;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
FieldAsyncSelect.displayName = "FieldAsyncSelect";

type tFieldMultiAsyncSelectRef<gtOption extends tOption> = {
  change: (setValues: gtOption[]) => void;
  reset: (defaultValues?: gtOption[]) => void;
};
type tFieldMultiAsyncSelectProps<gtOption extends tOption> = {
  id: string;
  isInvalid?: boolean;
  placeholder?: string;
  maxShownOptions?: number;
  defaultValues?: gtOption[];
  valueRender: (value: gtOption) => ReactNode;
  searchPlaceholder?: string;
  cacheKey: string;
  fetch: (
    search: string,
    page: number,
  ) => Promise<tPaginatedSuccessService<gtOption> | tErrorService>;
  optionRender: (
    option: gtOption,
    isSelected: boolean,
  ) => ReactElement<"button">;
  whenEmptyRender: () => ReactNode;
  whenErrorRender: () => ReactNode;
  onToggle?: (options?: gtOption[]) => void;
};

const FieldMultiAsyncSelect = forwardRef(
  <gtOption extends tOption>(
    {
      id,
      isInvalid,
      placeholder,
      maxShownOptions = 3,
      defaultValues = [],
      valueRender,
      searchPlaceholder,
      cacheKey,
      fetch,
      optionRender,
      whenEmptyRender,
      whenErrorRender,
      onToggle,
    }: tFieldMultiAsyncSelectProps<gtOption>,
    ref: Ref<tFieldMultiAsyncSelectRef<gtOption>>,
  ) => {
    const tFieldMultiAsyncSelect = useTranslations(
      "components.fields.multi-async-select",
    );

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const [values, setValues] = useState<gtOption[]>(defaultValues);

    const visibleValues: gtOption[] = isExpanded
      ? values
      : values.slice(0, maxShownOptions);

    const hiddenCount = values.length - visibleValues.length;

    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);

    const [debouncedSearch] = useDebounce(search, 300);

    const {
      isLoading,
      isFetching,
      data: result,
    } = useQuery({
      enabled: isOpen,
      placeholderData: (prev) => prev,
      queryKey: ["async-select", cacheKey, debouncedSearch, page],
      queryFn: async () => fetch(debouncedSearch, page),
    });

    function change(values: gtOption[]) {
      setValues(values);
    }

    function reset(defaultValues: gtOption[] = []) {
      setValues(defaultValues);
    }

    useImperativeHandle(ref, () => ({
      change,
      reset,
    }));

    function toggle(option: gtOption, isSelected: boolean) {
      if (isSelected) {
        const filteredValues = values.filter(
          (value) => value.value !== option.value,
        );

        setValues(filteredValues);
        onToggle?.(filteredValues);

        return;
      }

      setValues([...values, option]);
      onToggle?.([...values, option]);
    }

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            aria-invalid={isInvalid}
            variant="outline"
            className="h-auto justify-between text-start"
          >
            {values.length > 0 ? (
              <div className="flex flex-wrap items-center gap-1">
                {values.length > 0 ? (
                  <Fragment>
                    {visibleValues.flatMap((value) => (
                      <Badge key={value.value} variant="outline">
                        {valueRender(value)}
                        <span
                          className="hover:bg-foreground/10 inline-flex size-4 items-center justify-center rounded duration-100"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggle(value, true);
                          }}
                        >
                          <LuX className="size-3" />
                        </span>
                      </Badge>
                    ))}
                    {(visibleValues.length > maxShownOptions ||
                      hiddenCount > 0) && (
                      <Badge
                        variant="outline"
                        onClick={(event) => {
                          event.stopPropagation();
                          setIsExpanded((prev) => !prev);
                        }}
                      >
                        {isExpanded
                          ? tFieldMultiAsyncSelect("show-less")
                          : tFieldMultiAsyncSelect("show-more", {
                              count: hiddenCount,
                            })}
                      </Badge>
                    )}
                  </Fragment>
                ) : (
                  <span
                    aria-invalid={isInvalid}
                    className="text-muted-foreground aria-invalid:text-destructive/80 line-clamp-1 text-start text-sm text-wrap"
                  >
                    {placeholder}
                  </span>
                )}
              </div>
            ) : (
              <span
                aria-invalid={isInvalid}
                className="text-muted-foreground aria-invalid:text-destructive truncate"
              >
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
          <Command shouldFilter={false} className="rounded">
            <CommandInput
              placeholder={searchPlaceholder}
              value={search}
              onValueChange={setSearch}
            />
            <CommandList className="flex flex-col p-3">
              <CommandEmpty className="py-0">
                {isLoading || isFetching ? (
                  <FieldAsyncSelectLoading />
                ) : result?.isSuccess ? (
                  whenEmptyRender()
                ) : (
                  whenErrorRender()
                )}
              </CommandEmpty>
              {isLoading || isFetching
                ? null
                : result?.isSuccess && (
                    <>
                      {result.data.map((option) => {
                        const isSelected = values.some(
                          (value) => value.value === option.value,
                        );

                        return (
                          <CommandItem
                            asChild
                            key={option.value}
                            value={option.label}
                            className="w-full cursor-pointer gap-2.5 rounded"
                            onSelect={() => toggle(option, isSelected)}
                          >
                            {optionRender(option, isSelected)}
                          </CommandItem>
                        );
                      })}
                      <Pagination
                        pagination={result.pagination}
                        onPageChange={setPage}
                      />
                    </>
                  )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
) as <gtOption extends tOption>(
  props: tFieldMultiAsyncSelectProps<gtOption> & {
    ref?: Ref<tFieldMultiAsyncSelectRef<gtOption>>;
  },
) => JSX.Element;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
FieldMultiAsyncSelect.displayName = "FieldMultiAsyncSelect";

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

type tPagination = {
  pagination: tPaginatedSuccessModel<unknown>["pagination"];
  onPageChange?: (page: number) => void;
};
function Pagination({ pagination, onPageChange }: tPagination) {
  const tPagination = useTranslations(
    "components.fields.async-select.pagination",
  );

  const clsPagination = new ClsPagination(pagination);

  function changePage(page: number) {
    onPageChange?.(page);
  }

  return (
    <ShadcnPagination className="mt-3 gap-3">
      <PaginationContent>
        <PaginationItem>
          <PaginationButton
            size="icon"
            variant="outline"
            disabled={clsPagination.isFirst() ? true : undefined}
            onClick={() => changePage(clsPagination.firstPage().page)}
          >
            <LuChevronFirst />
          </PaginationButton>
        </PaginationItem>
        <PaginationItem>
          <PaginationButton
            size="icon"
            variant="outline"
            disabled={clsPagination.isFirst() ? true : undefined}
            onClick={() => changePage(clsPagination.previousPage().page)}
          >
            <LuChevronLeft />
          </PaginationButton>
        </PaginationItem>

        <PaginationItem>
          <PaginationButton
            size="icon"
            variant="outline"
            disabled={clsPagination.isLast() ? true : undefined}
            onClick={() => changePage(clsPagination.nextPage().page)}
          >
            <LuChevronRight />
          </PaginationButton>
        </PaginationItem>
        <PaginationItem>
          <PaginationButton
            size="icon"
            variant="outline"
            disabled={clsPagination.isLast() ? true : undefined}
            onClick={() => changePage(clsPagination.lastPage().page)}
          >
            <LuChevronLast />
          </PaginationButton>
        </PaginationItem>
      </PaginationContent>

      <p
        className="text-muted-foreground ms-auto text-sm whitespace-nowrap"
        aria-live="polite"
      >
        {tPagination.rich("page-details", {
          page: () => (
            <span className="text-foreground">{clsPagination.page}</span>
          ),
          totalPages: () => (
            <span className="text-foreground">{clsPagination.totalPages}</span>
          ),
        })}
      </p>
    </ShadcnPagination>
  );
}

export type {
  tGroup,
  tOption,
  tFieldSelectRef,
  tFieldMultiSelectRef,
  tFieldFreeSelectRef,
  tFieldAsyncSelectRef,
  tFieldMultiAsyncSelectRef,
};
export {
  FieldSelect,
  FieldMultiSelect,
  FieldFreeSelect,
  FieldAsyncSelect,
  FieldMultiAsyncSelect,
};
