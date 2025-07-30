import type { ComponentProps } from "react";

import Image from "next/image";

type TImageFullHD = {
  props: ComponentProps<typeof Image>;
};
export default function FullHDImage(props: TImageFullHD["props"]) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} width="1920" height="1080" />;
}
