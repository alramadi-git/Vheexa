import { ComponentProps, ReactNode } from "react";
import { cn } from "@/utilities/cn";
import { Badge as ShadcnBadge } from "@/components/shadcn/badge";
import { cva, VariantProps } from "class-variance-authority";
import { LuCheck, LuInfo, LuTriangleAlert, LuCircleX } from "react-icons/lu";
import { IconType } from "react-icons/lib";
import { Alert, AlertTitle, AlertDescription } from "@/components/shadcn/alert";

const sectionClassName: string = "px-8 py-16 lg:px-12 lg:py-24";
function Section({ className, children, ...props }: ComponentProps<"section">) {
  return (
    <section
      aria-label="section"
      className={cn(sectionClassName, className)}
      {...props}
    >
      {children}
    </section>
  );
}

function Container({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div
      aria-label="container"
      className={cn("container", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function Intro({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div aria-label="Intro" className={cn("space-y-4", className)} {...props}>
      {children}
    </div>
  );
}

function Title({
  heading = "h2",
  className,
  children,
  ...props
}:
  | ({ heading?: "h1" } & ComponentProps<"h1">)
  | ({ heading?: "h2" } & ComponentProps<"h2">)) {
  const Heading = heading;

  return (
    <Heading
      className={cn("text-4xl font-bold text-pretty", className)}
      {...props}
    >
      {children}
    </Heading>
  );
}
function Description({ className, children, ...props }: ComponentProps<"p">) {
  return (
    <p {...props} className={cn("text-muted-foreground text-lg", className)}>
      {children}
    </p>
  );
}

const badgeVariants = cva("border-none focus-visible:outline-none", {
  variants: {
    variant: {
      success:
        "bg-emerald-600/10 text-emerald-600 focus-visible:ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-400 dark:focus-visible:ring-emerald-400/40 [a&]:hover:bg-emerald-600/5 dark:[a&]:hover:bg-emerald-400/5",
      info: "bg-blue-600/10 text-blue-600 focus-visible:ring-blue-600/20 dark:bg-blue-400/10 dark:text-blue-400 dark:focus-visible:ring-blue-400/40 [a&]:hover:bg-blue-600/5 dark:[a&]:hover:bg-blue-400/5",
      warning:
        "bg-amber-600/10 text-amber-600 focus-visible:ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400 dark:focus-visible:ring-amber-400/40 [a&]:hover:bg-amber-600/5 dark:[a&]:hover:bg-amber-400/5",
      destructive:
        "bg-destructive/10 [a&]:hover:bg-destructive/5 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive",
      primary:
        "bg-primary/10 [a&]:hover:bg-primary/5 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40 text-primary",
      foreground:
        "bg-foreground/10 [a&]:hover:bg-foreground/5 focus-visible:ring-foreground/20 dark:focus-visible:ring-foreground/40 text-foreground",
      muted:
        "bg-muted-foreground/10 [a&]:hover:bg-muted-foreground/5 focus-visible:ring-muted-foreground/20 dark:focus-visible:ring-muted-foreground/40 text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});
function Badge({
  variant,
  className,
  ...props
}: ComponentProps<"span"> & VariantProps<typeof badgeVariants> & {}) {
  return (
    <ShadcnBadge
      {...props}
      className={cn(badgeVariants({ variant }), className)}
    />
  );
}

function Kbd({
  className,
  children,
  ...props
}: Omit<ComponentProps<"kbd">, "dir">) {
  return (
    <kbd
      {...props}
      dir="ltr"
      className={cn(
        "text-muted-foreground/70 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium",
        className,
      )}
    >
      {children}
    </kbd>
  );
}

function Blockquote({
  className,
  children,
  ...props
}: ComponentProps<"blockquote">) {
  return (
    <blockquote {...props} className={cn("border-s-2 ps-6 italic", className)}>
      &ldquo;{children}&rdquo;
    </blockquote>
  );
}

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
      {icon?.({ size: 16 })}
      <AlertTitle>{label}</AlertTitle>
      <AlertDescription className={cn(toastDescriptionVariants({ variant }))}>
        {children}
      </AlertDescription>
    </Alert>
  );
}

export { sectionClassName };
export {
  Section,
  Container,
  Intro,
  Title,
  Description,
  Badge,
  Kbd,
  Blockquote,
  Toast,
};
