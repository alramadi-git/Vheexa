"use client";

import { useQuery } from "@tanstack/react-query";

// import { useDebouncedCallback } from "use-debounce";

import { tUndefinable } from "@/types/nullish";
import { tResponseManyService } from "@/services/service";

import {
  ComponentProps,
  Ref,
  ReactNode,
  ReactElement,
  forwardRef,
  useState,
  useEffect,
  useImperativeHandle,
  Fragment,
} from "react";

import { useTranslations } from "next-intl";

import { LuArrowRight, LuCheck, LuChevronsUpDown, LuX } from "react-icons/lu";

import {
  Select as ShadcnSelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/shadcn/select";

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
  CommandGroup,
} from "@/components/shadcn/command";

import { Button } from "@/components/shadcn/button";
import { Skeleton } from "@/components/shadcn/skeleton";
import { Badge } from "@/components/shadcn/badge";

type tGroup<gtOption extends tOption> = {
  value: string;
  options: gtOption[];
};

type tOption = {
  value: string;
  label: string;
};

type tFieldSelectRef<gtOption extends tOption> = {
  change: (value: tUndefinable<gtOption>) => void;
  reset: (defaultValue?: gtOption) => void;
};
type tFieldSelectProps<gtOption extends tOption> = {
  isInvalid?: boolean;
  id?: string;
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
      isInvalid,
      id,
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

    function change(value: tUndefinable<gtOption>) {
      setValue(value);
    }

    function reset(defaultValue?: gtOption) {
      setValue(defaultValue);
    }

    useImperativeHandle(ref, () => ({
      change,
      reset,
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
) => ReactElement<typeof ShadcnSelect>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
FieldSelect.displayName = "FieldSelect";

type tFieldMultiSelectRef<gtOption extends tOption> = {
  reset: (defaultValues?: gtOption[]) => void;
  change: (values: gtOption[]) => void;
};
type tFieldMultiSelectProps<
  gtGroup extends tGroup<gtOption>,
  gtOption extends tOption,
> = {
  id?: string;
  isInvalid?: boolean;
  placeholder?: string;
  maxShownItems?: number;
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
      maxShownItems = 3,
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
      : values.slice(0, maxShownItems);

    const hiddenCount = values.length - visibleValues.length;

    function change(options: gtOption[]) {
      setValues(options);
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
        const options = values.filter((opt) => opt !== option);

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
                  {visibleValues.flatMap((option) => (
                    <Badge key={option.value} variant="outline">
                      {option.label}
                      <span
                        className="hover:bg-foreground/10 inline-flex size-4 items-center justify-center rounded duration-100"
                        onClick={(event) => {
                          event.stopPropagation();
                          toggle(option, true);
                        }}
                      >
                        <LuX className="size-3" />
                      </span>
                    </Badge>
                  ))}
                  {hiddenCount > 0 || isExpanded ? (
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
                  ) : null}
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
) => ReactElement;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
FieldMultiSelect.displayName = "FieldMultiSelect";

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

// type tFieldAsyncSelectRef = {
//   reset: (defaultValue?: tOption) => void;
// };
// type tFieldAsyncSelectProps = {
//   isInvalid?: boolean;
//   id: string;
//   placeholder: string;
//   value?: tOption;
//   triggerRender: (value: tOption) => ReactNode;
//   cacheKey: string;
//   fetch: (
//     search: string,
//     page: number,
//   ) => Promise<tResponseManyService<tOption>>;
//   inputProps?: ComponentProps<typeof CommandInput>;
//   whenEmptyRender: () => ReactNode;
//   optionRender: (item: tOption) => ReactElement<"button">;
//   whenErrorRender: () => ReactNode;
//   onSelect?: (option: tOption) => void;
// };

// const FieldAsyncSelect = forwardRef<
//   tFieldAsyncSelectRef,
//   tFieldAsyncSelectProps
// >(
//   (
//     {
//       isInvalid,
//       id,
//       placeholder,
//       value: valueProp,
//       triggerRender,
//       cacheKey,
//       fetch,
//       inputProps,
//       whenEmptyRender,
//       optionRender,
//       whenErrorRender,
//       onSelect,
//     },
//     ref,
//   ) => {
//     const [isOpen, setIsOpen] = useState<boolean>(false);

//     const [search, setSearch] = useState<string>("");
//     const [page, setPage] = useState<number>(1);
//     const [value, setValue] = useState<tUndefinable<tOption>>(valueProp);

//     const {
//       isLoading,
//       data: result,
//       refetch: refetchQuery,
//     } = useQuery({
//       enabled: false,
//       placeholderData: (result) => result,
//       queryKey: ["async-select", cacheKey, search, page],
//       queryFn: async () => fetch(search, page),
//     });

//     function reset() {
//       setValue(undefined);
//     }

//     useImperativeHandle(ref, () => ({
//       reset,
//     }));

//     useEffect(() => {
//       refetchQuery();
//     }, []);

//     const refetch = useDebouncedCallback(() => {
//       refetchQuery();
//     }, 500);

//     function Select(option: tOption) {
//       setIsOpen(false);

//       setSearch("");

//       setValue(option);
//       onSelect?.(option);
//     }

//     function onValueChange(search: string) {
//       setSearch(search);
//       refetch();
//     }

//     return (
//       <Popover open={isOpen} onOpenChange={setIsOpen}>
//         <PopoverTrigger asChild>
//           <Button
//             aria-invalid={isInvalid}
//             id={id}
//             variant="outline"
//             className="justify-between text-start"
//           >
//             {value ? (
//               triggerRender(value)
//             ) : (
//               <span
//                 aria-invalid={isInvalid}
//                 className="text-muted-foreground aria-invalid:text-destructive truncate"
//               >
//                 {isInvalid}
//                 {placeholder}
//               </span>
//             )}
//             <LuChevronsUpDown size={16} className="opacity-50" />
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent
//           align="start"
//           className="border-input max-w-[var(--radix-popper-anchor-width)] min-w-[var(--radix-popper-anchor-width)] rounded p-0"
//         >
//           <Command className="rounded">
//             <CommandInput
//               {...inputProps}
//               value={search}
//               onValueChange={onValueChange}
//             />
//             <CommandList className="flex flex-col p-3">
//               <CommandEmpty className="py-0">
//                 {isLoading ? (
//                   <FieldAsyncSelectLoading />
//                 ) : result?.isSuccess ? (
//                   whenEmptyRender()
//                 ) : (
//                   whenErrorRender()
//                 )}
//               </CommandEmpty>
//               {result?.isSuccess &&
//                 result.data.map((option) => (
//                   <CommandItem
//                     asChild
//                     key={option.value}
//                     value={option.label}
//                     className="w-full cursor-pointer gap-2.5 rounded"
//                     onSelect={() => Select(option)}
//                   >
//                     {optionRender(option)}
//                   </CommandItem>
//                 ))}
//             </CommandList>
//           </Command>
//         </PopoverContent>
//       </Popover>
//     );
//   },
// );

// FieldAsyncSelect.displayName = "FieldDynamicSelect";

// function FieldAsyncSelectLoading() {
//   return (
//     <div className="flex flex-col gap-2">
//       <Skeleton className="h-8" />
//       <Skeleton className="h-8" />
//       <Skeleton className="h-8" />
//       <Skeleton className="h-8" />
//       <Skeleton className="h-8" />
//     </div>
//   );
// }

export type {
  tGroup,
  tOption,
  tFieldSelectRef,
  tFieldMultiSelectRef,
  /** tFieldAsyncSelectRef */
};
export {
  FieldSelect,
  FieldMultiSelect,
  FieldFreeSearchableSelect,
  /** FieldAsyncSelect */
};
