import type { ComponentProps, JSX } from "react";

export default function List<TItem>({
  items,
  render,
  ...props
}: Omit<ComponentProps<"div">, "children"> & {
  items: Array<TItem>;
  render: (item: TItem) => JSX.Element;
}) {
  return <div {...props}>{items.map(render)}</div>;
}
