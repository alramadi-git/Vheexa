import type { ComponentProps } from "react";

import Image from "next/image";

type TReSizedImage = Omit<ComponentProps<typeof Image>, "width" | "height">;

function HDImage(props: TReSizedImage) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} width="1280" height="720" />;
}

function FullHDImage(props: TReSizedImage) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} width="1920" height="1080" />;
}

function _2KImage(props: TReSizedImage) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} width="2560" height="1440" />;
}

function _4KImage(props: TReSizedImage) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} width="3840" height="2160" />;
}

export { HDImage, FullHDImage, _2KImage, _4KImage };
