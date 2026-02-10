"use client";

import { eLocale } from "@/i18n/routing";

import { tUndefinable } from "@/types/nullish";

import { cn } from "@/utilities/cn";
import { ClsDateFormatter } from "@/libraries/date-formatter";

import { useLocale, useTranslations } from "next-intl";

import {
  ComponentProps,
  KeyboardEvent,
  forwardRef,
  useState,
  useImperativeHandle,
  ChangeEvent,
  useRef,
  ReactNode,
  useEffect,
} from "react";

import {
  LuMail,
  LuEye,
  LuEyeOff,
  LuCalendar,
  LuSearch,
  LuCheck,
  LuX,
  LuPhone,
  LuChevronDown,
  LuUser,
  LuAtSign,
} from "react-icons/lu";

import {
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import { defaultCountries, FlagImage } from "react-international-phone";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";

import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/shadcn/command";

import { Calendar } from "@/components/shadcn/calendar";

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

type tFieldIconInputProps = Omit<
  ComponentProps<typeof Input>,
  "type" | "className"
> & {
  icon: ReactNode;
  onChange?: (value: string) => void;
};
function FieldIconInput({
  icon,
  onChange: onChangeProp,
  ...props
}: tFieldIconInputProps) {
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    onChangeProp?.(event.currentTarget.value);
  }

  return (
    <div className="relative">
      <span
        aria-invalid={props["aria-invalid"]}
        className="text-muted-foreground/80 aria-invalid:text-destructive/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50"
      >
        {icon}
      </span>
      <Input {...props} type="text" className="ps-9" onChange={onChange} />
    </div>
  );
}

type tFieldSearchProps = Omit<
  ComponentProps<typeof Input>,
  "type" | "className" | "onChange"
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
        className="text-muted-foreground/80 aria-invalid:text-destructive/60 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50"
      >
        <LuSearch className="size-4" />
      </span>
      <Input {...props} type="search" className="ps-9" onChange={onChange} />
    </div>
  );
}

type tFieldHandleProps = Omit<
  ComponentProps<typeof Input>,
  "type" | "className"
> & {
  onChange?: (value: string) => void;
};
function FieldHandle({ onChange: onChangeProp, ...props }: tFieldHandleProps) {
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    onChangeProp?.(event.currentTarget.value);
  }

  return (
    <div className="relative">
      <span
        aria-invalid={props["aria-invalid"]}
        className="text-muted-foreground/80 aria-invalid:text-destructive/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50"
      >
        <LuAtSign className="size-4" />
      </span>
      <Input {...props} type="text" className="ps-9" onChange={onChange} />
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
        <LuUser className="size-4" />
      </span>
      <Input {...props} type="text" className="ps-9" onChange={onChange} />
    </div>
  );
}

type tFieldTagsRef = {
  setValues: (values: string[]) => void;
  reset: (defaultValues?: string[]) => void;
};
type tFieldTagsProps = {
  id?: string;
  placeholder?: string;
  defaultValues?: string[];
  onValuesChange?: (values: string[]) => void;
};
const FieldTags = forwardRef<tFieldTagsRef, tFieldTagsProps>(
  ({ id, placeholder, defaultValues, onValuesChange }, ref) => {
    const [values, setValues] = useState<string[]>(defaultValues ?? []);

    function imperativeSetValue(values: string[]) {
      setValues(values);
    }

    function imperativeReset(defaultValues: string[] = []) {
      setValues(defaultValues);
    }

    useImperativeHandle(ref, () => ({
      setValues: imperativeSetValue,
      reset: imperativeReset,
    }));

    function changeValues(tags: string[]) {
      setValues(tags);
      onValuesChange?.(tags);
    }

    return (
      <TagsInputRoot
        value={defaultValues}
        onValueChange={changeValues}
        className="flex flex-col gap-2"
      >
        <div className="border-input dark:bg-input/30 flex flex-wrap items-center gap-1.5 rounded border px-2.5 py-1 text-sm focus-within:ring-1 focus-within:ring-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-within:ring-zinc-400">
          {values.map((tag) => (
            <TagsInputItem
              key={tag}
              value={tag}
              className="inline-flex max-w-[calc(100%-8px)] items-center gap-1.5 rounded border bg-transparent px-2.5 py-1 text-sm focus:outline-hidden data-disabled:cursor-not-allowed data-disabled:opacity-50 data-editable:select-none data-editing:bg-transparent data-editing:ring-1 data-editing:ring-zinc-500 dark:data-editing:ring-zinc-400 [&:not([data-editing])]:pr-1.5 [&[data-highlighted]:not([data-editing])]:bg-zinc-200 [&[data-highlighted]:not([data-editing])]:text-black dark:[&[data-highlighted]:not([data-editing])]:bg-zinc-800 dark:[&[data-highlighted]:not([data-editing])]:text-white"
            >
              <TagsInputItemText className="truncate" />
              <TagsInputItemDelete className="size-4 shrink-0 rounded opacity-70 ring-offset-zinc-950 transition-opacity hover:opacity-100">
                <LuX className="size-4" />
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
  setValue: (value?: tMinMax) => void;
  reset: (defaultValue?: tMinMax) => void;
};
type tFieldNumberMinMaxProps = {
  id?: string;
  isInvalid?: boolean;
  minPlaceholder?: string;
  min?: number;
  maxPlaceholder?: string;
  max?: number;
  onMinChange?: (value?: number) => void;
  onMaxChange?: (value?: number) => void;
  formatter?: (value?: number) => string;
};
const FieldNumberMinMax = forwardRef<
  tFieldNumberMinMaxRef,
  tFieldNumberMinMaxProps
>(
  (
    {
      id,
      isInvalid,
      minPlaceholder,
      min: minProp,
      maxPlaceholder,
      max: maxProp,
      onMaxChange: _onMaxChange,
      onMinChange: _onMinChange,
      formatter,
    },
    ref,
  ) => {
    const [min, setMin] = useState<number>(minProp ?? 0);
    const [minValue, setMinValue] = useState<string>(
      formatter?.(minProp) ?? minProp?.toString() ?? "",
    );

    const [max, setMax] = useState<number>(maxProp ?? 0);
    const [maxValue, setMaxValue] = useState<string>(
      formatter?.(maxProp) ?? maxProp?.toString() ?? "",
    );

    function imperativeChange(value?: tMinMax) {
      const min = value?.min;
      const max = value?.max;

      setMin(min ?? 0);
      setMinValue(formatter?.(min) ?? min?.toString() ?? "");

      setMax(max ?? 0);
      setMaxValue(formatter?.(max) ?? max?.toString() ?? "");
    }

    function imperativeReset(defaultValue?: tMinMax) {
      const min = defaultValue?.min;
      const max = defaultValue?.max;

      setMin(min ?? 0);
      setMinValue(formatter?.(min) ?? min?.toString() ?? "");

      setMax(max ?? 0);
      setMaxValue(formatter?.(max) ?? max?.toString() ?? "");
    }

    useImperativeHandle(ref, () => ({
      setValue: imperativeChange,
      reset: imperativeReset,
    }));

    function onFocus(field: "min" | "max") {
      if (field === "min") setMinValue(minValue === "" ? "" : min.toString());
      else setMaxValue(maxValue === "" ? "" : max.toString());
    }

    function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
      if (event.key === "Enter") event.currentTarget.blur();
    }

    function onBlur(field: "min" | "max", value: string) {
      const parsedValue = value === "" ? undefined : Number(value);
      if (field === "min") onMinBlur(parsedValue);
      else onMaxBlur(parsedValue);
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

    function changeValue(field: "min" | "max", value: string) {
      if (field === "min") setMinValue(value);
      else setMaxValue(value);
    }

    return (
      <div className="flex">
        <Input
          id={id}
          aria-invalid={isInvalid}
          type="text"
          placeholder={minPlaceholder}
          className="rounded-e-none"
          value={minValue}
          onFocus={() => onFocus("min")}
          onKeyDown={onKeyDown}
          onChange={(event) => changeValue("min", event.currentTarget.value)}
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
          onChange={(event) => changeValue("max", event.currentTarget.value)}
          onBlur={(event) => onBlur("max", event.currentTarget.value)}
        />
      </div>
    );
  },
);
FieldNumberMinMax.displayName = "FieldNumberMinMaxMinMax";

type tCountry = {
  country: string;
  "country-calling-code": string;
};

type tFieldPhoneNumberRef = {
  reset: (defaultValue?: string) => void;
};
type tFieldPhoneNumberProps = {
  id?: string;
  isRequired?: boolean;
  isInvalid?: boolean;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

const FieldPhoneNumber = forwardRef<
  tFieldPhoneNumberRef,
  tFieldPhoneNumberProps
>(({ id, isRequired, isInvalid, defaultValue = "", onValueChange }, ref) => {
  const phoneNumberRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const tFieldPhoneNumber = useTranslations("components.fields.phone-number");
  const defaultCountry: tCountry = tFieldPhoneNumber.raw(
    "country.default-value",
  );

  const [country, setCountry] = useState<tCountry>(defaultCountry);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  useEffect(() => {
    const parsedPhoneNumber = parsePhoneNumberFromString(defaultValue);
    if (!parsedPhoneNumber) {
      setPhoneNumber(defaultValue);

      return;
    }

    setCountry({
      country: parsedPhoneNumber.country!.toLocaleLowerCase(),
      "country-calling-code": parsedPhoneNumber.countryCallingCode,
    });
    setPhoneNumber(parsedPhoneNumber.nationalNumber);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function imperativeReset(defaultValue: string = ""): void {
    const parsedPhoneNumber = parsePhoneNumberFromString(defaultValue);
    if (!parsedPhoneNumber) {
      setPhoneNumber(defaultValue);
      return;
    }

    setCountry({
      country: parsedPhoneNumber.country!,
      "country-calling-code": parsedPhoneNumber.countryCallingCode,
    });
    setPhoneNumber(parsedPhoneNumber.nationalNumber);
  }

  useImperativeHandle(ref, () => ({
    reset: imperativeReset,
  }));

  function selectCountry(country: tCountry): void {
    setCountry(country);

    setIsOpen(false);
    phoneNumberRef.current?.focus();
  }

  function saveValue() {
    if (
      !isValidPhoneNumber(`+${country["country-calling-code"]}${phoneNumber}`)
    ) {
      setPhoneNumber("");
      onValueChange?.("");

      return;
    }

    const parsedPhoneNumber = parsePhoneNumberFromString(
      `+${country["country-calling-code"]}${phoneNumber}`,
    );
    if (!parsedPhoneNumber) {
      setPhoneNumber("");
      onValueChange?.("");

      return;
    }

    setPhoneNumber(parsedPhoneNumber.nationalNumber);
    onValueChange?.(parsedPhoneNumber.number);
  }

  return (
    <div className="flex items-center">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="border-input rounded-e-none border-r-0 px-3 shadow-none outline-offset-0 outline-none focus-visible:outline-[3px]"
          >
            <FlagImage iso2={country.country} size={24} />
            <p className="text-muted-foreground">
              +{country["country-calling-code"]}
            </p>
            <LuChevronDown
              aria-hidden="true"
              className="text-muted-foreground/80"
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
              {defaultCountries.map((_country) => (
                <CommandItem
                  key={_country[1]}
                  value={`${_country[0]}-${_country[1]}-${_country[2]}`}
                  onSelect={() => {
                    selectCountry({
                      country: _country[1],
                      "country-calling-code": _country[2],
                    });
                  }}
                >
                  <div className="flex items-center gap-2">
                    <FlagImage iso2={_country[1]} size={24} />
                    {_country[0]}
                    <span className="text-muted-foreground">
                      +{_country[2]}
                    </span>
                  </div>

                  {country.country === _country[1] && (
                    <LuCheck className="ml-auto size-4" />
                  )}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="relative grow">
        <Input
          ref={phoneNumberRef}
          aria-invalid={isInvalid}
          required={isRequired}
          id={id}
          type="tel"
          placeholder={tFieldPhoneNumber("placeholder")}
          className="rounded-s-none pe-8"
          value={phoneNumber}
          onKeyDown={(event) =>
            event.key === "Enter" && event.currentTarget.blur()
          }
          onChange={(event) => setPhoneNumber(event.currentTarget.value)}
          onBlur={saveValue}
        />
        <div
          className={cn(
            "text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50",
            {
              "text-destructive/80": isInvalid,
            },
          )}
        >
          <LuPhone className="size-4" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
});

FieldPhoneNumber.displayName = "FieldPhoneNumber";

type tFieldEmailRef = {
  setValue: (value: string) => void;
  reset: (defaultValue?: string) => void;
};

type tFieldEmailProps = {
  id?: string;
  isInvalid?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

const FieldEmail = forwardRef<tFieldEmailRef, tFieldEmailProps>(
  (
    {
      id,
      isInvalid,
      isRequired,
      placeholder,
      defaultValue = "",
      onValueChange: onValueChangeProp,
    },
    ref,
  ) => {
    const [value, setValue] = useState<string>(defaultValue);

    function imperativeSetValue(value: string) {
      setValue(value);
    }
    function imperativeRest(defaultValue: string = "") {
      setValue(defaultValue);
    }

    useImperativeHandle(ref, () => ({
      setValue: imperativeSetValue,
      reset: imperativeRest,
    }));

    function changeValue(value: string) {
      setValue(value);
      onValueChangeProp?.(value);
    }

    return (
      <div className="relative">
        <Input
          id={id}
          aria-invalid={isInvalid}
          required={isRequired}
          type="email"
          placeholder={placeholder}
          className="pe-9"
          value={value}
          onChange={(event) => changeValue(event.currentTarget.value)}
        />
        <span
          aria-invalid={isInvalid}
          className="text-muted-foreground/80 aria-invalid:text-destructive/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50"
        >
          <LuMail className="size-4" />
        </span>
      </div>
    );
  },
);

FieldEmail.displayName = "FieldEmail";

type tFieldPasswordRef = {
  setValue: (value: string) => void;
  reset: (defaultValue?: string) => void;
};

type tFieldPasswordProps = {
  id?: string;
  isInvalid?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

const FieldPassword = forwardRef<tFieldPasswordRef, tFieldPasswordProps>(
  (
    {
      id,
      isInvalid,
      isRequired,
      placeholder,
      defaultValue = "",
      onValueChange: onValueChangeProp,
    },
    ref,
  ) => {
    const [value, setValue] = useState<string>(defaultValue);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    function imperativeSetValue(value: string) {
      setValue(value);
    }
    function imperativeRest(defaultValue: string = "") {
      setValue(defaultValue);
    }

    useImperativeHandle(ref, () => ({
      setValue: imperativeSetValue,
      reset: imperativeRest,
    }));

    function toggleVisibility() {
      setIsVisible((prevState) => !prevState);
    }

    function changeValue(value: string) {
      setValue(value);
      onValueChangeProp?.(value);
    }

    return (
      <div className="relative">
        <Input
          id={id}
          aria-invalid={isInvalid}
          required={isRequired}
          type={isVisible ? "text" : "password"}
          placeholder={placeholder}
          className="pe-9"
          value={value}
          onChange={(event) => changeValue(event.currentTarget.value)}
        />
        {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props */}
        <button
          aria-invalid={isInvalid}
          type="button"
          className="text-muted-foreground/80 aria-invalid:text-destructive/80 absolute inset-y-0 end-0 flex items-center justify-center pe-3 disabled:opacity-50"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <LuEyeOff className="size-4" />
          ) : (
            <LuEye className="size-4" />
          )}
        </button>
      </div>
    );
  },
);

FieldPassword.displayName = "FieldPassword";

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
              <LuCalendar className="size-4" />
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

export type {
  tFieldEmailRef,
  tFieldPasswordRef,
  tFieldTagsRef,
  tFieldNumberMinMaxRef,
  tFieldPhoneNumberRef,
  tFieldDatePickerRef,
};
export {
  FieldIconInput,
  FieldSearch,
  FieldHandle,
  FieldUsername,
  FieldEmail,
  FieldPassword,
  FieldTags,
  FieldPhoneNumber,
  FieldNumber,
  FieldNumberMinMax,
  FieldDatePicker,
};
