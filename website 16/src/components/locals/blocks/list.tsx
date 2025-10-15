import type { ComponentProps, JSX } from "react";

export default function List<tItem>({
  items,
  render,
  ...props
}: Omit<ComponentProps<"div">, "children"> & {
  items: Array<tItem>;
  render: (item: tItem) => JSX.Element;
}) {
  return <div {...props}>{items.map(render)}</div>;
}
