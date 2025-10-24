"use client";

import { cn } from "@/utilities/cn";
import {
  motion,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import type { SpringOptions } from "framer-motion";
import { useEffect } from "react";

export type AnimatedNumberProps = {
  value: number;
  className?: string;
  springOptions?: SpringOptions;
  as?: React.ElementType;
};

export function AnimatedNumber({
  value,
  className,
  springOptions,
  as = "span",
}: AnimatedNumberProps) {
  const MotionComponent = motion.create(as);

  const spring = useSpring(value, springOptions);
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString(),
  );
  const text = useMotionTemplate`${display}`;

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <MotionComponent className={cn("tabular-nums", className)}>
      {text}
    </MotionComponent>
  );
}
