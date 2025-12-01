"use client";

import { tEmail, tPassword } from "@/validations/authentication";
import { ComponentProps, useState } from "react";

import { cn } from "@/utilities/cn";

import {
  FieldValues,
  Path,
  ControllerRenderProps,
  ControllerFieldState,
  UseFormStateReturn,
} from "react-hook-form";

import { LuMail, LuEye, LuEyeOff } from "react-icons/lu";
import { Input } from "@/components/shadcn/input";

export type tInputProps = ComponentProps<typeof Input>;
export type tControllerRenderProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues>,
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<TFieldValues>;
};

export type tFieldPassword = {
  controllerRenderProps: tControllerRenderProps<tPassword, "password">;
  inputProps?: Omit<
    tInputProps,
    "ref" | "type" | "name" | "disabled" | "value" | "onChange" | "onBlur"
  >;
};
export function FieldPassword({
  controllerRenderProps,
  inputProps: { id, className, ...inputProps } = {},
}: tFieldPassword) {
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
        {...controllerRenderProps.field}
        {...inputProps}
      />

      <button
        aria-pressed={isVisible}
        aria-label={isVisible ? "Hide" : "Show"}
        aria-controls="password"
        type="button"
        className={cn(
          "text-muted-foreground/80 hover:text-foreground absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          {
            "text-destructive/80 hover:text-destructive":
              controllerRenderProps.fieldState.invalid,
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

export type tFieldEmail = {
  controllerRenderProps: tControllerRenderProps<tEmail, "email">;
  inputProps?: Omit<
    tInputProps,
    "ref" | "type" | "name" | "disabled" | "value" | "onChange" | "onBlur"
  >;
};
export function FieldEmail({
  controllerRenderProps,
  inputProps: { id, className, ...inputProps } = {},
}: tFieldEmail) {
  return (
    <div className="relative">
      <Input
        id={id}
        type="email"
        className={cn("peer pe-9", className)}
        {...controllerRenderProps.field}
        {...inputProps}
      />
      <div
        className={cn(
          "text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50",
          {
            "text-destructive": controllerRenderProps.fieldState.invalid,
          },
        )}
      >
        <LuMail size={16} aria-hidden="true" />
      </div>
    </div>
  );
}
