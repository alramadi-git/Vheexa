import type { ComponentProps } from "react";
import { cn } from "@/utilities/cn";

export function Section({
  className,
  children,
  ...props
}: ComponentProps<"section">) {
  return (
    <section
      className={cn("px-8 py-16 md:px-16 md:py-32", className)}
      {...props}
    >
      {children}
    </section>
  );
}
export function Container({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div {...props} className={cn("container", className)}>
      {children}
    </div>
  );
}

export function Intro({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div {...props} className={cn("space-y-4", className)}>
      {children}
    </div>
  );
}

export function Title({ className, children, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn("text-5xl leading-18 font-bold text-balance", className)}
      {...props}
    >
      {children}
    </h2>
  );
}
export function Description({
  className,
  children,
  ...props
}: ComponentProps<"p">) {
  return (
    <p {...props} className={cn("text-muted-foreground text-lg", className)}>
      {children}
    </p>
  );
}

export function Kbd({
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

export function Blockquote({
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
