import { type ComponentProps } from "react";

interface IProps extends ComponentProps<"img"> {
  src: string;
  alt: string;
}
function Image({
  loading = "lazy",
  decoding = "async",
  fetchPriority = "low",
  crossOrigin = "anonymous",
  referrerPolicy = "no-referrer",
  ...props
}: IProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      crossOrigin={crossOrigin}
      referrerPolicy={referrerPolicy}
      {...props}
    />
  );
}

export default Image;
