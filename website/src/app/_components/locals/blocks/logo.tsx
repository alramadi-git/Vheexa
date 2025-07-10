import { type ComponentProps } from "react";

import { cn } from "@/app/_utilities";

import Image from "next/image";

interface IProps extends Omit<ComponentProps<typeof Image>, "alt" | "src"> {}
function Logo({
  priority = true,
  loading,
  fetchPriority,
  width = "24",
  height = "24",
  className,
}: IProps) {
  return (
    <Image
      priority={priority}
      loading={loading}
      fetchPriority={fetchPriority}
      width={width}
      height={height}
      alt="logo"
      src="https://ik.imagekit.io/alramadi/vheexa/logo/logo.png"
      className={cn("size-6", className)}
    />
  );
}

export default Logo;
