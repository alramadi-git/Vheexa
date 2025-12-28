"use client";

import { eLocale } from "@/i18n/routing";

import { tUndefinable } from "@/types/nullish";

import { tPassword } from "@/validations/authentication-credentials";

import { cn } from "@/utilities/cn";
import { ClsDateFormatter } from "@/libraries/date-formatter";

import { useLocale, useTranslations } from "next-intl";

import {
  ComponentProps,
  ReactNode,
  useState,
  useEffect,
  useMemo,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";

import {
  FieldValues,
  Path,
  ControllerRenderProps,
  ControllerFieldState,
  UseFormStateReturn,
  FieldPath,
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

type tInputProps = ComponentProps<typeof Input>;
type tControllerRenderProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<TFieldValues>;
};

type tFieldSearchProps = Omit<tInputProps, "type" | "className">;
function FieldSearch(props: tFieldSearchProps) {
  return (
    <div className="relative">
      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
        <LuSearch className="size-4" />
        <span className="sr-only">Search</span>
      </div>
      <Input
        type="search"
        className="peer px-9 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
        {...props}
      />
    </div>
  );
}

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

type tCountry = {
  iso2: string;
  "country-code": string;
};

type tFieldPhoneNumberProps = {
  isInvalid?: boolean;
  isRequired?: boolean;
  id?: string;
  value: string;
  setValue: (value: string) => void;
};
type tFieldPhoneNumberRef = {
  reset: () => void;
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
    reset: () => reset(),
  }));

  useEffect(() => {
    changePhoneInput(phoneNumber);
  }, [selectedCountry]);

  function changePhoneInput(phoneNumber: string): void {
    const formattedPhoneNumber = new AsYouType(
      selectedCountry.iso2.toUpperCase() as CountryCode,
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
  }

  function reset(): void {
    setPhoneNumber("");
    setSelectedCountry(countryDefaultValue);
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
            <FlagImage iso2={selectedCountry.iso2} size={24} />
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
                      iso2: country[1],
                      "country-code": country[2],
                    });
                  }}
                >
                  <div className="flex items-center gap-2">
                    <FlagImage iso2={country[1]} size={24} />
                    {country[0]}
                    <span className="text-muted-foreground">+{country[2]}</span>
                  </div>

                  {selectedCountry.iso2 === country[1] && (
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

type tFieldEmailProps = Omit<ComponentProps<typeof Input>, "type">;
function FieldEmail({ className, ...props }: tFieldEmailProps) {
  return (
    <div className="relative">
      <Input type="email" className={cn("peer pe-9", className)} {...props} />
      <div
        className={cn(
          "text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50",
          {
            "text-destructive": props["aria-invalid"],
          },
        )}
      >
        <LuMail size={16} aria-hidden="true" />
      </div>
    </div>
  );
}

type tFieldPasswordProps = {
  controller: tControllerRenderProps<
    {
      password: tPassword;
    },
    "password"
  >;
  inputProps?: Omit<
    tInputProps,
    "ref" | "type" | "name" | "disabled" | "value" | "onChange" | "onBlur"
  >;
};
function FieldPassword({
  controller,
  inputProps: { id, className, ...inputProps } = {},
}: tFieldPasswordProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  function toggleVisibility() {
    setIsVisible((prevState) => !prevState);
  }

  return (
    <div className="relative">
      <Input
        id={id}
        type={isVisible ? "text" : "password"}
        className={cn("pe-9", className)}
        {...controller.field}
        {...inputProps}
      />

      <button
        aria-pressed={isVisible}
        aria-label={isVisible ? "Hide" : "Show"}
        aria-controls="password"
        type="button"
        className={cn(
          "text-muted-foreground/80 hover:text-foreground absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          {
            "text-destructive/80 hover:text-destructive":
              controller.fieldState.invalid,
          },
        )}
        onClick={toggleVisibility}
      >
        {isVisible ? (
          <LuEyeOff size={16} aria-hidden="true" />
        ) : (
          <LuEye size={16} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

type tFieldMultiSelectProps<option extends { value: string; label: string }> = {
  id?: string;
  placeholder?: string;
  options: option[];
  values: option["value"][];
  setValues: (value: option["value"][]) => void;
  render?: (option: option, isSelected: boolean) => ReactNode;
};
function FieldMultiSelect<option extends { value: string; label: string }>({
  id,
  placeholder,
  options,
  values,
  setValues,
  render = (option, isSelected) => (
    <>
      <span className="truncate">{option.label}</span>
      {isSelected && <LuCheck size={16} className="ml-auto" />}
    </>
  ),
}: tFieldMultiSelectProps<option>) {
  const tFieldMultiSelect = useTranslations("components.fields.multiselect");

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Define maxShownItems before using visibleItems
  const maxShownItems = 2;
  const visibleItems: option[] = expanded
    ? values.map((value) => options.find((option) => option.value === value)!)
    : values
        .slice(0, maxShownItems)
        .map((value) => options.find((option) => option.value === value)!);

  const hiddenCount = values.length - visibleItems.length;

  function toggleSelection(value: string, isSelected: boolean) {
    if (isSelected) {
      setValues(values.filter((val) => val.toString() !== value));
    } else {
      setValues([...values, value]);
    }
  }

  function removeSelection(value: string) {
    toggleSelection(value, true);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          aria-expanded={open}
          role="combobox"
          variant="outline"
          className="h-auto min-h-8 w-full justify-between hover:bg-transparent"
        >
          <div className="flex flex-wrap items-center gap-1 truncate pr-2.5">
            {values.length > 0 ? (
              <>
                {visibleItems.map((visibleItem) => {
                  return (
                    <Badge
                      key={visibleItem.value}
                      variant="outline"
                      className="rounded"
                    >
                      {visibleItem.label}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSelection(visibleItem.value);
                        }}
                        asChild
                      >
                        <span>
                          <LuX className="size-3" />
                        </span>
                      </Button>
                    </Badge>
                  );
                })}
                {hiddenCount > 0 || expanded ? (
                  <Badge
                    variant="outline"
                    className="rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpanded((prev) => !prev);
                    }}
                  >
                    {expanded
                      ? tFieldMultiSelect("show-less")
                      : tFieldMultiSelect("show-more", {
                          count: hiddenCount,
                        })}
                  </Badge>
                ) : null}
              </>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
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
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>{tFieldMultiSelect("when-no-results")}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected: boolean = values.some(
                  (value) => value === option.value,
                );

                return (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onSelect={() => toggleSelection(option.value, isSelected)}
                  >
                    {render(option, isSelected)}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

type tFieldDatePickerProps<
  tFieldValues extends FieldValues = FieldValues,
  tName extends FieldPath<tFieldValues> = FieldPath<tFieldValues>,
> = {
  controller: tControllerRenderProps<tFieldValues, tName>;
  inputProps?: Omit<
    tInputProps,
    "ref" | "type" | "name" | "disabled" | "value" | "onChange" | "onBlur"
  >;
};
function FieldDatePicker<
  tFieldValues extends FieldValues = FieldValues,
  tName extends FieldPath<tFieldValues> = FieldPath<tFieldValues>,
>({
  controller,
  inputProps: { className, ...inputProps } = {},
}: tFieldDatePickerProps<tFieldValues, tName>) {
  const locale = useLocale() as eLocale;
  const clsDateFormatter = useMemo(
    () => new ClsDateFormatter(locale),
    [locale],
  );

  const [inputValue, setInputValue] = useState<string>(
    !controller.field.value
      ? ""
      : clsDateFormatter.format(controller.field.value),
  );

  const [month, setMonth] = useState<tUndefinable<Date>>(
    controller.field.value ?? new Date(),
  );

  return (
    <div className="relative flex gap-2">
      <Input
        value={inputValue}
        placeholder={clsDateFormatter.format(new Date())}
        className={cn("bg-background pr-10", className)}
        onKeyDown={(e) => e.code === "Enter" && e.currentTarget.blur()}
        onChange={(e) => {
          const value = e.target.value;
          const date = new Date(value);

          setInputValue(value);

          if (value === "") {
            setMonth(undefined);
            controller.field.onChange(undefined);

            return;
          }

          if (isNaN(date.getTime())) return;

          setMonth(date);
          controller.field.onChange(date);
        }}
        onBlur={() => {
          if (controller.field.value === undefined) setInputValue("");
          else setInputValue(clsDateFormatter.format(controller.field.value));
        }}
        {...inputProps}
      />
      <Popover
        onOpenChange={(open) => !open && setMonth(controller.field.value)}
      >
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
          >
            <LuCalendar className="size-3.5" />
            <span className="sr-only">Pick a date</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto overflow-hidden p-0"
          align="end"
          alignOffset={-8}
          sideOffset={10}
        >
          <Calendar
            mode="single"
            month={month}
            onMonthChange={setMonth}
            selected={controller.field.value}
            onSelect={(date) => {
              controller.field.onChange(date);

              if (!date) return;
              setInputValue(clsDateFormatter.format(date));
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

type tFileUploadProps = Omit<ComponentProps<typeof FileUpload>, "onFileReject">;
function FieldFileUpload({
  id,
  value,
  onFileValidate: validateFile,
  ...props
}: tFileUploadProps) {
  const tFileUpload = useTranslations("components.fields.file-upload");

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
      value={value}
      onFileValidate={onFileValidate}
      onFileReject={onFileReject}
      {...props}
    >
      <FileUploadDropzone className="size-full">
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex items-center justify-center rounded-full border p-2.5">
            <LuUpload className="text-muted-foreground size-6" />
          </div>
          <p className="text-sm font-medium">{tFileUpload("title")}</p>
          <p className="text-muted-foreground text-xs">
            {tFileUpload("subtitle")}
          </p>
        </div>
        <FileUploadTrigger asChild id={id}>
          <Button variant="outline" size="sm" className="mt-2 w-fit">
            {tFileUpload("trigger")}
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
    </FileUpload>
  );
}

export type { tFieldPhoneNumberRef };
export {
  FieldSearch,
  FieldNumber,
  FieldPhoneNumber,
  FieldPassword,
  FieldEmail,
  FieldMultiSelect,
  FieldDatePicker,
  FieldFileUpload,
};
