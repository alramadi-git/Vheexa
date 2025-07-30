import type { ComponentProps } from "react";
import type { FieldValues } from "react-hook-form";

import { cn } from "@/utilities/cn";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/form";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";
import { Input as ShadcnInput } from "@/components/shadcn/input";

type TInput<TFieldValues extends FieldValues>  = {
  props: {
    formField: Omit<ComponentProps<typeof FormField<TFieldValues>>, "render">;
    label?: string;
    input?: ComponentProps<typeof ShadcnInput>;
    description?: string;
  };
};
export default function Input<TFieldValues extends FieldValues = FieldValues>(
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
              {...props.input}
              {...field}
              className={cn(
                {
                  "text-destructive": fieldState.invalid,
                },
                props.input?.className,
              )}
            />
          </FormControl>

          {!fieldState.invalid && props.description && (
            <FormDescription>{props.description}</FormDescription>
          )}

          <Tooltip>
            <TooltipTrigger asChild>
              <FormMessage className="w-fit" />
            </TooltipTrigger>
            <TooltipContent
              sideOffset={-1}
              side="bottom"
              className="bg-card text-foreground border px-2"
            >
              {fieldState.error?.message}
            </TooltipContent>
          </Tooltip>
        </FormItem>
      )}
    />
  );
}
