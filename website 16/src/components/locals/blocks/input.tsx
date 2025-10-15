import type { ComponentProps } from "react";
import type { FieldValues } from "react-hook-form";

import { cn } from "@/utilities/cn";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/shadcn/form";
import { Input as ShadcnInput } from "@/components/shadcn/input";

type TInput<TFieldValues extends FieldValues> = {
  props: {
    formField: Omit<ComponentProps<typeof FormField<TFieldValues>>, "render">;
    label?: string;
    input?: ComponentProps<typeof ShadcnInput>;
    description?: string;
  };
};

function Input<TFieldValues extends FieldValues = FieldValues>(
  props: TInput<TFieldValues>["props"],
) {
  return (
    <FormField
      {...props.formField}
      render={({ field, fieldState }) => (
        <FormItem>
          {!!props.label && <FormLabel>{props.label}</FormLabel>}
          <FormControl>
            <ShadcnInput
              {...field}
              {...props.input}
              className={cn(
                {
                  "text-destructive placeholder:text-destructive":
                    fieldState.invalid,
                },
                props.input?.className,
              )}
            />
          </FormControl>

          {!fieldState.invalid && props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}
          <FormMessage className="w-fit" />
        </FormItem>
      )}
    />
  );
}

export { Input };
