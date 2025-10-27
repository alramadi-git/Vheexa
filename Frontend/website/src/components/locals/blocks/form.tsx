import { type ComponentProps, useState } from "react";

import { LuEyeOff, LuEye } from "react-icons/lu";
import { Input } from "@/components/shadcn/input";
import { cn } from "@/utilities/cn";

type tPasswordInputProps = {} & Omit<ComponentProps<typeof Input>, "type">;
export function PasswordInput({ className, ...props }: tPasswordInputProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  function toggleVisibility() {
    setIsVisible((prevState) => !prevState);
  }

  return (
    <div className="relative">
      <Input
        type={isVisible ? "text" : "password"}
        className={cn("pe-9", className)}
        {...props}
      />

      <button
        className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        onClick={toggleVisibility}
        aria-label={isVisible ? "Hide password" : "Show password"}
        aria-pressed={isVisible}
        aria-controls="password"
      >
        {isVisible ? (
          <LuEyeOff
            size={16}
            className={cn({ "text-destructive": props["aria-invalid"] })}
            aria-hidden="true"
          />
        ) : (
          <LuEye
            size={16}
            className={cn({ "text-destructive": props["aria-invalid"] })}
            aria-hidden="true"
          />
        )}
      </button>
    </div>
  );
}
