import type { ComponentProps } from "react";
import { cn } from "@/utilities/cn";

function Section({ className, children, ...props }: ComponentProps<"section">) {
  return (
    <section className={cn("px-16 py-32", className)} {...props}>
      {children}
    </section>
  );
}
function Container({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div {...props} className={cn("container", className)}>
      {children}
    </div>
  );
}

function Intro({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div {...props} className={cn("space-y-4", className)}>
      {children}
    </div>
  );
}

enum LEVEL {
  H1 = "h1",
  H2 = "h2",
}
function Title({
  level = LEVEL.H2,
  className,
  children,
  ...props
}: (ComponentProps<"h1"> | ComponentProps<"h2">) & { level?: LEVEL }) {
  const H = level;

  return (
    <H
      className={cn("text-5xl leading-18 font-bold text-pretty", className)}
      {...props}
    >
      {children}
    </H>
  );
}
function Description({ className, children, ...props }: ComponentProps<"p">) {
  return (
    <p {...props} className={cn("text-muted-foreground text-lg", className)}>
      {children}
    </p>
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

export { LEVEL };
export { Section, Container, Intro, Title, Description, Kbd, Blockquote };
