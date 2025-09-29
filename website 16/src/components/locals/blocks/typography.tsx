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
    <div className={cn("container", className)} {...props}>
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
    <div className={cn("space-y-4", className)} {...props}>
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
    <p className={cn("text-muted-foreground text-lg", className)} {...props}>
      {children}
    </p>
  );
}

export function Blockquote({
  className,
  children,
  ...props
}: ComponentProps<"blockquote">) {
  return (
    <blockquote className={cn("border-s-2 ps-6 italic", className)} {...props}>
      &ldquo;{children}&rdquo;
    </blockquote>
  );
}
