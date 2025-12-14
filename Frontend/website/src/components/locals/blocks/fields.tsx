"use client";

import { tUndefinable } from "@/types/nullish";

import { tEmail } from "@/validations/email";
import { tPassword } from "@/validations/password";

import { cn } from "@/utilities/cn";
import { ClsDateFormatter } from "@/libraries/date-formatter";

import { eLocale } from "@/i18n/routing";

import { useLocale, useTranslations } from "next-intl";
import { ComponentProps, useCallback, useMemo, useState } from "react";

import {
  FieldValues,
  Path,
  ControllerRenderProps,
  ControllerFieldState,
  UseFormStateReturn,
  FieldPath,
} from "react-hook-form";

import { LuMail, LuEye, LuEyeOff, LuCalendar, LuUpload } from "react-icons/lu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";
import { Calendar } from "@/components/shadcn/calendar";

import { toast } from "sonner";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadTrigger,
} from "@/components/shadcn/file-upload";
import { Toast } from "./typography";

type tInputProps = ComponentProps<typeof Input>;
type tControllerRenderProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<TFieldValues>;
};

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

type tFieldEmailProps = {
  controller: tControllerRenderProps<
    {
      email: tEmail;
    },
    "email"
  >;
  inputProps?: Omit<
    tInputProps,
    "ref" | "type" | "name" | "disabled" | "value" | "onChange" | "onBlur"
  >;
};
function FieldEmail({
  controller,
  inputProps: { id, className, ...inputProps } = {},
}: tFieldEmailProps) {
  return (
    <div className="relative">
      <Input
        id={id}
        type="email"
        className={cn("peer pe-9", className)}
        {...controller.field}
        {...inputProps}
      />
      <div
        className={cn(
          "text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50",
          {
            "text-destructive": controller.fieldState.invalid,
          },
        )}
      >
        <LuMail size={16} aria-hidden="true" />
      </div>
    </div>
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
function FieldFileUpload({ id, ...props }: tFileUploadProps) {
  const tFileUpload = useTranslations("components.fields.file-upload");

  const onFileReject = useCallback(
    (file: File, message: string) => {
      toast.custom(() => (
        <Toast variant="destructive" label={message}>
          <p>
            {tFileUpload("when-reject", {
              filename:
                file.name.length > 10
                  ? file.name.slice(0, 10) + "..."
                  : file.name,
            })}
          </p>
        </Toast>
      ));
    },
    [tFileUpload],
  );

  return (
    <FileUpload onFileReject={onFileReject} {...props}>
      <FileUploadDropzone>
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
export { FieldPassword, FieldEmail, FieldDatePicker, FieldFileUpload };
