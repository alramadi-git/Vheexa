"use client";

import { cn } from "@/utilities/cn";
import { useTheme } from "next-themes";

import { Fragment } from "react";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { Particles } from "@/components/magicui/particles";

export default function Background() {
  const { resolvedTheme } = useTheme();
  const isLightTheme = resolvedTheme === "light";

  return (
    <Fragment>
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "mask-[radial-gradient(ellipse,rgba(0,0,0,0.3)_30%,black_50%)]",
          "-z-50 dark:fill-slate-700",
        )}
      />
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={isLightTheme ? "#000" : "#fff"}
        refresh
      />
    </Fragment>
  );
}
