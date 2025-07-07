import type { ComponentProps } from "react";

import { cn } from "@/app/_utilities";

import type { FieldValues } from "react-hook-form";
import { Input as ShadcnInput } from "@/app/_components/shadcn/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/shadcn/form";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/_components/shadcn/tooltip";

interface IProps<TFieldValues extends FieldValues> {
  formField: Omit<ComponentProps<typeof FormField<TFieldValues>>, "render">;
  label?: string;
  input?: ComponentProps<typeof ShadcnInput>;
  description?: string;
}
function Input<TFieldValues extends FieldValues = FieldValues>(
  props: IProps<TFieldValues>
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
                props.input?.className
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
              className="px-2 bg-card border text-foreground "
            >
              {fieldState.error?.message}
            </TooltipContent>
          </Tooltip>
        </FormItem>
      )}
    />
  );
}

export default Input;
