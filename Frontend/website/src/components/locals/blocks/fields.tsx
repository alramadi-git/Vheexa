"use client";

import { eLocale } from "@/i18n/routing";

import { tUndefinable } from "@/types/nullish";

import { tPassword } from "@/validations/authentication-credentials";

import { cn } from "@/utilities/cn";
import { ClsDateFormatter } from "@/libraries/date-formatter";

import { useLocale, useTranslations } from "next-intl";

import {
  ComponentProps,
  RefAttributes,
  ReactElement,
  KeyboardEvent,
  forwardRef,
  useState,
  useCallback,
  useImperativeHandle,
  Fragment,
  ChangeEvent,
} from "react";

import {
  FieldValues,
  Path,
  ControllerRenderProps,
  ControllerFieldState,
  UseFormStateReturn,
} from "react-hook-form";

import {
  LuMail,
  LuEye,
  LuEyeOff,
  LuCalendar,
  LuUpload,
  LuSearch,
  LuChevronsUpDown,
  LuCheck,
  LuX,
  LuPhone,
  LuChevronDown,
  LuUser,
} from "react-icons/lu";

import { CountryCode, AsYouType, formatNumber } from "libphonenumber-js";
import { defaultCountries, FlagImage } from "react-international-phone";

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

import {
  FileUpload,
  FileUploadTrigger,
  FileUploadDropzone,
} from "@/components/shadcn/file-upload";

import { Calendar } from "@/components/shadcn/calendar";

import { toast } from "sonner";
import { Toast } from "./typography";

import { Badge } from "@/components/shadcn/badge";
import { Input } from "@/components/shadcn/input";

import { Button } from "@/components/shadcn/button";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/shadcn/number-field";
import {
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
  TagsInputRoot,
} from "@diceui/tags-input";

type tFieldSearchProps = Omit<
  ComponentProps<typeof Input>,
  "type" | "className"
> & {
  onChange?: (value: string) => void;
};
function FieldSearch({ onChange: onChangeProp, ...props }: tFieldSearchProps) {
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    onChangeProp?.(event.currentTarget.value);
  }

  return (
    <div className="relative">
      <span
        aria-invalid={props["aria-invalid"]}
        className="text-muted-foreground/80 aria-invalid:text-destructive/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50"
      >
        <LuSearch size={16} />
      </span>
      <Input {...props} type="search" className="ps-9" onChange={onChange} />
    </div>
  );
}

type tFieldUsernameProps = Omit<
  ComponentProps<typeof Input>,
  "type" | "className"
> & {
  onChange?: (value: string) => void;
};
function FieldUsername({
  onChange: onChangeProp,
  ...props
}: tFieldUsernameProps) {
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    onChangeProp?.(event.currentTarget.value);
  }

  return (
    <div className="relative">
      <span
        aria-invalid={props["aria-invalid"]}
        className="text-muted-foreground/80 aria-invalid:text-destructive/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50"
      >
        <LuUser size={16} />
      </span>
      <Input {...props} type="text" className="ps-9" onChange={onChange} />
    </div>
  );
}

type tFieldTagsRef = {
  reset: (tags?: string[]) => void;
};
type tFieldTagsProps = {
  id?: string;
  placeholder?: string;
  tags?: string[];
  onTagsChange?: (values: string[]) => void;
};
const FieldTags = forwardRef<tFieldTagsRef, tFieldTagsProps>(
  ({ id, placeholder, tags, onTagsChange }, ref) => {
    const [_tags, _setTags] = useState<string[]>(tags ?? []);

    useImperativeHandle(ref, () => ({
      reset,
    }));

    function reset(tags: string[] = []) {
      _setTags(tags);
    }

    function changeTags(tags: string[]) {
      _setTags(tags);
      onTagsChange?.(tags);
    }

    return (
      <TagsInputRoot
        value={tags}
        onValueChange={changeTags}
        className="flex flex-col gap-2"
      >
        <div className="border-input bg-background flex flex-wrap items-center gap-1.5 rounded border px-2.5 py-1 text-sm focus-within:ring-1 focus-within:ring-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-within:ring-zinc-400">
          {_tags.map((tag) => (
            <TagsInputItem
              key={tag}
              value={tag}
              className="inline-flex max-w-[calc(100%-8px)] items-center gap-1.5 rounded border bg-transparent px-2.5 py-1 text-sm focus:outline-hidden data-disabled:cursor-not-allowed data-disabled:opacity-50 data-editable:select-none data-editing:bg-transparent data-editing:ring-1 data-editing:ring-zinc-500 dark:data-editing:ring-zinc-400 [&:not([data-editing])]:pr-1.5 [&[data-highlighted]:not([data-editing])]:bg-zinc-200 [&[data-highlighted]:not([data-editing])]:text-black dark:[&[data-highlighted]:not([data-editing])]:bg-zinc-800 dark:[&[data-highlighted]:not([data-editing])]:text-white"
            >
              <TagsInputItemText className="truncate" />
              <TagsInputItemDelete className="size-4 shrink-0 rounded opacity-70 ring-offset-zinc-950 transition-opacity hover:opacity-100">
                <LuX size={16} />
              </TagsInputItemDelete>
            </TagsInputItem>
          ))}
          <TagsInputInput
            id={id}
            autoCapitalize="none"
            placeholder={placeholder}
            className="max-w-full flex-1 bg-transparent outline-hidden placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:placeholder:text-zinc-400"
          />
        </div>
      </TagsInputRoot>
    );
  },
);
FieldTags.displayName = "FieldTags";

type tFieldNumberProps = Omit<ComponentProps<typeof NumberField>, "className">;
function FieldNumber({
  "aria-invalid": isInvalid,
  ...props
}: tFieldNumberProps) {
  return (
    <NumberField
      aria-invalid={isInvalid}
      format={{
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }}
      className="aria-invalid:text-destructive"
      {...props}
    >
      <NumberFieldGroup aria-invalid={isInvalid}>
        <NumberFieldDecrement
          aria-invalid={isInvalid}
          className="aria-invalid:text-destructive/80"
        />
        <NumberFieldInput />
        <NumberFieldIncrement
          aria-invalid={isInvalid}
          className="aria-invalid:text-destructive/80"
        />
      </NumberFieldGroup>
    </NumberField>
  );
}

type tMinMax = {
  min?: number;
  max?: number;
};
type tFieldNumberMinMaxRef = {
  change: (minMax?: tMinMax) => void;
  reset: (minMax?: tMinMax) => void;
};
type tFieldNumberMinMaxProps = {
  id?: string;
  "aria-invalid"?: boolean;
  "min-placeholder"?: string;
  min?: number;
  onMinChange?: (value?: number) => void;
  "max-placeholder"?: string;
  max?: number;
  onMaxChange?: (value?: number) => void;
  formatter?: (value?: number) => string;
};
const FieldNumberMinMax = forwardRef<
  tFieldNumberMinMaxRef,
  tFieldNumberMinMaxProps
>(
  (
    {
      "aria-invalid": isInvalid,
      id,
      "min-placeholder": minPlaceholder,
      min: _min,
      onMinChange: _onMinChange,
      "max-placeholder": maxPlaceholder,
      max: _max,
      onMaxChange: _onMaxChange,
      formatter,
    },
    ref,
  ) => {
    const [min, setMin] = useState<number>(_min ?? 0);
    const [minValue, setMinValue] = useState<string>(
      formatter?.(_min) ?? _min?.toString() ?? "",
    );

    const [max, setMax] = useState<number>(_max ?? 0);
    const [maxValue, setMaxValue] = useState<string>(
      formatter?.(_max) ?? _max?.toString() ?? "",
    );

    function change(minMax?: tMinMax) {
      const min = minMax?.min;
      const max = minMax?.max;

      setMin(min ?? 0);
      setMinValue(formatter?.(min) ?? min?.toString() ?? "");

      setMax(max ?? 0);
      setMaxValue(formatter?.(max) ?? max?.toString() ?? "");
    }

    function reset(minMax?: tMinMax) {
      const min = minMax?.min;
      const max = minMax?.max;

      setMin(min ?? 0);
      setMinValue(formatter?.(min) ?? min?.toString() ?? "");

      setMax(max ?? 0);
      setMaxValue(formatter?.(max) ?? max?.toString() ?? "");
    }

    useImperativeHandle(ref, () => ({
      change,
      reset,
    }));

    function onFocus(field: "min" | "max") {
      if (field === "min") setMinValue(minValue === "" ? "" : min.toString());
      else setMaxValue(maxValue === "" ? "" : max.toString());
    }

    function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
      if (event.key === "Enter") event.currentTarget.blur();
    }

    function onChange(field: "min" | "max", value: string) {
      if (field === "min") setMinValue(value);
      else setMaxValue(value);
    }

    function onMinBlur(value?: number) {
      if (Number.isNaN(value)) {
        setMin(0);
        setMinValue("");
        _onMinChange?.(undefined);

        return;
      }

      setMin(value ?? 0);
      setMinValue(formatter?.(value) ?? value?.toString() ?? "");
      _onMinChange?.(value);
    }
    function onMaxBlur(value?: number) {
      if (Number.isNaN(value)) {
        setMax(0);
        setMaxValue("");
        _onMaxChange?.(undefined);

        return;
      }

      setMax(value ?? 0);
      setMaxValue(formatter?.(value) ?? value?.toString() ?? "");
      _onMaxChange?.(value);
    }

    function onBlur(field: "min" | "max", value: string) {
      const parsedValue = value === "" ? undefined : Number(value);
      if (field === "min") onMinBlur(parsedValue);
      else onMaxBlur(parsedValue);
    }

    return (
      <div className="flex">
        <Input
          aria-invalid={isInvalid}
          id={id}
          type="text"
          placeholder={minPlaceholder}
          className="rounded-e-none"
          value={minValue}
          onFocus={() => onFocus("min")}
          onKeyDown={onKeyDown}
          onChange={(event) => onChange("min", event.currentTarget.value)}
          onBlur={(event) => onBlur("min", event.currentTarget.value)}
        />
        <Input
          aria-invalid={isInvalid}
          type="text"
          placeholder={maxPlaceholder}
          className="rounded-s-none aria-invalid:border-s-transparent"
          value={maxValue}
          onFocus={() => onFocus("max")}
          onKeyDown={onKeyDown}
          onChange={(event) => onChange("max", event.currentTarget.value)}
          onBlur={(event) => onBlur("max", event.currentTarget.value)}
        />
      </div>
    );
  },
);
FieldNumberMinMax.displayName = "FieldNumberMinMaxMinMax";

type tCountry = {
  iso: string;
  "country-code": string;
};

type tFieldPhoneNumberRef = {
  reset: () => void;
};
type tFieldPhoneNumberProps = {
  isInvalid?: boolean;
  isRequired?: boolean;
  id?: string;
  value: string;
  setValue: (value: string) => void;
};

const FieldPhoneNumber = forwardRef<
  tFieldPhoneNumberRef,
  tFieldPhoneNumberProps
>(({ isInvalid, isRequired, id, value, setValue }, ref) => {
  const tFieldPhoneNumber = useTranslations("components.fields.phone-number");

  const countryDefaultValue = tFieldPhoneNumber.raw("country.default-value");

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [phoneNumber, setPhoneNumber] = useState<string>(value);
  const [selectedCountry, setSelectedCountry] =
    useState<tCountry>(countryDefaultValue);

  useImperativeHandle(ref, () => ({
    reset,
  }));

  function reset(): void {
    setPhoneNumber("");
    setSelectedCountry(countryDefaultValue);
  }

  function changePhoneInput(phoneNumber: string): void {
    const formattedPhoneNumber = new AsYouType(
      selectedCountry.iso.toUpperCase() as CountryCode,
    ).input(phoneNumber);

    setPhoneNumber(formattedPhoneNumber);
    setValue(
      formatNumber(
        `+${selectedCountry["country-code"]}${phoneNumber}`,
        "E.164",
      ),
    );
  }

  function selectCountry(country: tCountry): void {
    setIsOpen(false);

    setSelectedCountry(country);
    changePhoneInput(phoneNumber);
  }

  return (
    <div className="flex items-center">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "border-input w-28 justify-between rounded-e-none border-r-0 px-3 shadow-none outline-offset-0 outline-none focus-visible:outline-[3px]",
              {
                "border-destructive": isInvalid,
              },
            )}
          >
            <FlagImage iso2={selectedCountry.iso} size={24} />
            <span>+{selectedCountry["country-code"]}</span>
            <LuChevronDown
              className="text-muted-foreground/80"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="border-input w-full p-0">
          <Command>
            <CommandInput
              placeholder={tFieldPhoneNumber("country.placeholder")}
            />
            <CommandList>
              <CommandEmpty>
                {tFieldPhoneNumber("country.when-empty")}
              </CommandEmpty>
              {defaultCountries.map((country) => (
                <CommandItem
                  key={country[1]}
                  value={`${country[0]}-${country[1]}-${country[2]}`}
                  onSelect={() => {
                    selectCountry({
                      iso: country[1],
                      "country-code": country[2],
                    });
                  }}
                >
                  <div className="flex items-center gap-2">
                    <FlagImage iso2={country[1]} size={24} />
                    {country[0]}
                    <span className="text-muted-foreground">+{country[2]}</span>
                  </div>

                  {selectedCountry.iso === country[1] && (
                    <LuCheck size={16} className="ml-auto" />
                  )}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="relative grow">
        <Input
          id={id}
          aria-invalid={isInvalid}
          required={isRequired}
          type="tel"
          placeholder={tFieldPhoneNumber("placeholder")}
          className="rounded-s-none pe-8"
          value={phoneNumber}
          onChange={(e) => {
            changePhoneInput(e.currentTarget.value);
          }}
        />

        <div
          className={cn(
            "text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50",
            {
              "text-destructive/80": isInvalid,
            },
          )}
        >
          <LuPhone size={16} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
});
FieldPhoneNumber.displayName = "FieldPhoneNumber";

type tFieldEmailProps = Omit<
  ComponentProps<typeof Input>,
  "type" | "className"
> & {
  onChange?: (value: string) => void;
};
function FieldEmail({ onChange: onChangeProp, ...props }: tFieldEmailProps) {
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    onChangeProp?.(event.currentTarget.value);
  }

  return (
    <div className="relative">
      <Input
        {...props}
        type="email"
        className="peer pe-9"
        onChange={onChange}
      />
      <span
        aria-invalid={props["aria-invalid"]}
        className="text-muted-foreground/80 aria-invalid:text-destructive/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50"
      >
        <LuMail size={16} />
      </span>
    </div>
  );
}

type tFieldPasswordProps = Omit<
  ComponentProps<typeof Input>,
  "type" | "className"
> & {
  onChange?: (value: string) => void;
};
function FieldPassword({
  onChange: onChangeProp,
  ...props
}: tFieldPasswordProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  function toggleVisibility() {
    setIsVisible((prevState) => !prevState);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    onChangeProp?.(event.currentTarget.value);
  }

  return (
    <div className="relative">
      <Input
        {...props}
        type={isVisible ? "text" : "password"}
        className="pe-9"
        onChange={onChange}
      />
      {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props */}
      <button
        aria-invalid={props["aria-invalid"]}
        disabled={props.disabled}
        type="button"
        className="text-muted-foreground/80 aria-invalid:text-destructive/80 absolute inset-y-0 end-0 flex items-center justify-center pe-3 disabled:opacity-50"
        onClick={toggleVisibility}
      >
        {isVisible ? <LuEyeOff size={16} /> : <LuEye size={16} />}
      </button>
    </div>
  );
}

type tGroup<gOption extends tOption> = {
  value: string;
  options: gOption[];
};
type tOption = {
  value: string;
  label: string;
};

type tFieldMultiSelectRef<gOption extends tOption> = {
  reset: (options?: gOption[]) => void;
  change: (options: gOption[]) => void;
};
type tFieldMultiSelectProps<
  gGroup extends tGroup<gOption>,
  gOption extends tOption,
> = {
  id?: string;
  maxShownItems?: number;
  "select-placeholder"?: string;
  "search-placeholder"?: string;
  groups: gGroup[];
  values?: gOption[];
  onChange?: (options: gOption[]) => void;
  renderTrigger: (option: gOption) => string;
  renderGroup: (
    group: gGroup,
    selectedOptions: gOption[],
    toggleSelection: (optionToToggle: gOption, isSelected: boolean) => void,
  ) => ReactElement<typeof CommandGroup>;
};

const FieldMultiSelect = forwardRef(
  <gGroup extends tGroup<gOption>, gOption extends tOption>(
    {
      id,
      maxShownItems = 2,
      "select-placeholder": selectPlaceholder,
      "search-placeholder": searchPlaceholder,
      groups,
      values: _values = [],
      onChange,
      renderTrigger,
      renderGroup,
    }: tFieldMultiSelectProps<gGroup, gOption>,
    ref: React.Ref<tFieldMultiSelectRef<gOption>>,
  ) => {
    const tFieldMultiSelect = useTranslations("components.fields.multiselect");

    const [values, setValues] = useState<gOption[]>(_values);

    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const visibleGroups: gOption[] = isExpanded
      ? values
      : values.slice(0, maxShownItems);

    const hiddenCount = values.length - visibleGroups.length;

    function change(options: gOption[]) {
      console.log("updating", options);
      setValues(options);
    }

    function reset(options: gOption[] = []) {
      setValues(options);
    }
    useImperativeHandle(ref, () => ({
      change,
      reset,
    }));

    function toggleSelection(optionToToggle: gOption, isSelected: boolean) {
      if (isSelected) {
        const options = values.filter((option) => option !== optionToToggle);

        setValues(options);
        onChange?.(options);
        return;
      }

      const options = [...values, optionToToggle];
      setValues(options);
      onChange?.(options);
    }

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            aria-expanded={isOpen}
            role="combobox"
            variant="outline"
            className="h-auto min-h-8 w-full justify-between hover:bg-transparent"
          >
            <div className="flex flex-wrap items-center gap-1">
              {values.length > 0 ? (
                <Fragment>
                  {visibleGroups.flatMap((option) => (
                    <Badge key={option.value} variant="outline" className="">
                      {renderTrigger(option)}
                      <span
                        className="hover:bg-foreground/10 inline-flex size-4 items-center justify-center rounded duration-100"
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleSelection(option, true);
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
                <span className="text-muted-foreground line-clamp-1 text-start text-sm text-wrap">
                  {selectPlaceholder}
                </span>
              )}
            </div>
            <LuChevronsUpDown
              className="text-muted-foreground/80 shrink-0"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-(--radix-popper-anchor-width) p-0">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>
                {tFieldMultiSelect("when-no-results")}
              </CommandEmpty>
              {groups.map((group) =>
                renderGroup(group, values, toggleSelection),
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
) as <gGroup extends tGroup<gOption>, gOption extends tOption>(
  props: tFieldMultiSelectProps<gGroup, gOption> &
    RefAttributes<tFieldMultiSelectRef<gOption>>,
) => ReactElement;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
FieldMultiSelect.displayName = "FieldMultiSelect";

type tFieldDatePickerRef = {
  reset: (date?: Date) => void;
};

type tFieldDatePickerProps = {
  "aria-invalid"?: boolean;
  isRequired?: boolean;
  id?: string;
  placeholder?: string;
  className?: string;
  value?: Date;
  setValue?: (value?: Date) => void;
};
const FieldDatePicker = forwardRef<tFieldDatePickerRef, tFieldDatePickerProps>(
  (
    {
      "aria-invalid": isInvalid,
      isRequired,
      id,
      placeholder,
      className,
      value,
      setValue,
    },
    ref,
  ) => {
    const locale = useLocale() as eLocale;
    const clsDateFormatter = new ClsDateFormatter(locale);

    const [date, setDate] = useState<tUndefinable<Date>>(value);
    const [month, setMonth] = useState<tUndefinable<Date>>(date);

    const [inputValue, setInputValue] = useState<string>(
      date === undefined ? "" : clsDateFormatter.format(date),
    );

    useImperativeHandle(ref, () => ({
      reset,
    }));

    function reset(date?: Date) {
      setDate(date);
      setMonth(date);
      setValue?.(date);

      if (!date) setInputValue("");
      else setInputValue(clsDateFormatter.format(date));
    }

    function selectCalendar(date?: Date) {
      setDate(date);
      setMonth(date);
      setValue?.(date);

      if (!date) setInputValue("");
      else setInputValue(clsDateFormatter.format(date));
    }

    return (
      <div className="relative flex gap-2">
        <Input
          aria-invalid={isInvalid}
          required={isRequired}
          id={id}
          placeholder={placeholder}
          className={cn("bg-background pr-10", className)}
          value={inputValue}
          onKeyDown={(e) => e.code === "Enter" && e.currentTarget.blur()}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => {
            const date = new Date(inputValue);
            if (date === undefined || isNaN(date.getTime())) {
              setInputValue("");
              setMonth(undefined);
              setDate(undefined);
              setValue?.(undefined);

              return;
            }

            setInputValue(clsDateFormatter.format(date));
            setMonth(date);
            setDate(date);
            setValue?.(date);
          }}
        />
        <Popover onOpenChange={(open) => open && setMonth(date)}>
          <PopoverTrigger asChild>
            <Button
              aria-invalid={isInvalid}
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <LuCalendar size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            alignOffset={-8}
            sideOffset={10}
            align="end"
            className="w-auto overflow-hidden p-0"
          >
            <Calendar
              mode="single"
              month={month}
              onMonthChange={setMonth}
              selected={date}
              onSelect={selectCalendar}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  },
);
FieldDatePicker.displayName = "FieldDatePicker";

type tFileUploadRef = {
  reset: (files?: File[]) => void;
  changeValue: (value: File[]) => void;
};

type tFileUploadProps = Omit<
  ComponentProps<typeof FileUpload>,
  "onFileReject"
> & {
  "aria-invalid"?: boolean;
  setValue?: (value: File[]) => void;
};
const FieldFileUpload = forwardRef<tFileUploadRef, tFileUploadProps>(
  (
    {
      "aria-invalid": isInvalid,
      id,
      value,
      setValue,
      onFileValidate: validateFile,
      ...props
    },
    ref,
  ) => {
    const tFileUpload = useTranslations("components.fields.file-upload");

    const [files, setFiles] = useState<File[]>(value ?? []);

    useImperativeHandle(ref, () => ({
      changeValue,
      reset,
    }));

    function changeValue(files: File[]) {
      setFiles(files);
    }

    function reset(files: File[] = []) {
      setFiles(files);
    }

    const onFileValidate = useCallback(
      (file: File) => {
        if (value?.some((value) => value.name === file.name)) {
          return tFileUpload("validations.when-duplicate-names", {
            filename: file.name,
          });
        }

        const validation = validateFile?.(file);
        if (validation) return validation;

        return null;
      },
      [value, validateFile, tFileUpload],
    );

    const onValueChange = useCallback(
      (files: File[]) => {
        setValue?.(files);
        setFiles(files);
      },
      [setValue],
    );

    const onFileReject = useCallback(
      (file: File, message: string) => {
        toast.custom(() => (
          <Toast
            variant="destructive"
            label={tFileUpload("when-reject", {
              filename:
                file.name.length > 10
                  ? file.name.slice(0, 10) + "..."
                  : file.name,
            })}
          >
            <p>{message}</p>
          </Toast>
        ));
      },
      [tFileUpload],
    );

    return (
      <FileUpload
        {...props}
        value={files}
        onFileValidate={onFileValidate}
        onValueChange={onValueChange}
        onFileReject={onFileReject}
      >
        <FileUploadDropzone
          className={cn("size-full", {
            "border-destructive ring-destructive/20": isInvalid,
          })}
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <div>
              <LuUpload
                size={46}
                aria-invalid={isInvalid}
                className="aria-invalid:border-destructive text-muted-foreground aria-invalid:text-destructive/80 rounded-full border p-2.5"
              />
            </div>
            <p
              aria-invalid={isInvalid}
              className="aria-invalid:text-destructive text-sm font-medium"
            >
              {tFileUpload("title")}
            </p>
            <p
              aria-invalid={isInvalid}
              className="aria-invalid:text-destructive/80 text-muted-foreground text-xs"
            >
              {tFileUpload("subtitle")}
            </p>
          </div>
          <FileUploadTrigger asChild>
            <Button
              aria-invalid={isInvalid}
              id={id}
              variant="outline"
              size="sm"
              className="mt-2 w-fit"
            >
              {tFileUpload("trigger")}
            </Button>
          </FileUploadTrigger>
        </FileUploadDropzone>
      </FileUpload>
    );
  },
);
FieldFileUpload.displayName = "FieldFileUpload";

export type {
  tFieldTagsRef,
  tFieldNumberMinMaxRef,
  tFieldPhoneNumberRef,
  tFieldMultiSelectRef,
  tFieldDatePickerRef,
  tFileUploadRef,
};
export {
  FieldSearch,
  FieldUsername,
  FieldTags,
  FieldEmail,
  FieldPassword,
  FieldPhoneNumber,
  FieldNumber,
  FieldNumberMinMax,
  FieldMultiSelect,
  FieldDatePicker,
  FieldFileUpload,
};
