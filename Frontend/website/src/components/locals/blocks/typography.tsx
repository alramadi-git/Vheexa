import { ComponentProps } from "react";
import { cn } from "@/utilities/cn";

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
        "text-muted-foreground/70 inline-flex h-5 max-h-full items-center rounded-sm border px-1 font-[inherit] text-[0.625rem] font-medium",
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

export { sectionClassName };
export { Section, Container, Intro, Title, Description, Kbd, Blockquote };
