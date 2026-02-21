import { ReactNode } from "react";
import { IconType } from "react-icons/lib";

import { cva } from "class-variance-authority";
import { cn } from "@/utilities/cn";

import { LuCheck, LuInfo, LuTriangleAlert, LuCircleX } from "react-icons/lu";

import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/alert";

const toastVariants = cva("", {
  variants: {
    variant: {
      default: "border-primary text-primary",
      success:
        "border-green-600 text-green-600 dark:border-green-400 dark:text-green-400",
      info: "border-sky-600 text-sky-600 dark:border-sky-400 dark:text-sky-400",
      warning:
        "border-amber-600 text-amber-600 dark:border-amber-400 dark:text-amber-400",
      destructive:
        "border-destructive text-destructive dark:border-destructive/80 dark:text-destructive/80",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
const toastDescriptionVariants = cva("", {
  variants: {
    variant: {
      default: "border-muted-foreground text-muted-foreground",
      success: "text-green-600/80 dark:text-green-400/80",
      info: "text-sky-600/80 dark:text-sky-400/80",
      warning: "text-amber-600/80 dark:text-amber-400/80",
      destructive: "text-destructive/80 dark:text-destructive/40",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type tToastProps = {
  variant?: "default" | "success" | "info" | "warning" | "destructive";
  label: string;
  icon?: IconType;
  children?: ReactNode;
};

function Toast({ variant = "default", label, icon, children }: tToastProps) {
  icon =
    icon ??
    (variant === "success"
      ? LuCheck
      : variant === "info"
        ? LuInfo
        : variant === "warning"
          ? LuTriangleAlert
          : variant === "destructive"
            ? LuCircleX
            : undefined);

  return (
    <Alert className={cn(toastVariants({ variant }))}>
      <AlertTitle className="inline-flex items-center gap-1.5">
        {icon?.({ size: 16 })}

        {label}
      </AlertTitle>
      <AlertDescription className={cn(toastDescriptionVariants({ variant }))}>
        {children}
      </AlertDescription>
    </Alert>
  );
}

export { Toast };
