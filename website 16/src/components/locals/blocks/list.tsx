import type { ComponentProps, JSX } from "react";
import { Fragment } from "react";

export function List<tItem>({
  isLoading,
  items,
  render,
  whenLoading = {
    length: 10,
    render: () => <Fragment />,
  },
  whenEmpty,
  ...props
}: Omit<ComponentProps<"div">, "children"> & {
  isLoading: boolean;
  items: Array<tItem>;
  render: (item: tItem) => JSX.Element;
  whenLoading: {
    length: number;
    render: (value: null, index: number, array: number[]) => JSX.Element;
  };
  whenEmpty?: JSX.Element;
}) {
  if (isLoading == true)
    return (
      <ListSkeleton length={whenLoading.length} render={whenLoading.render} />
    );

  if (items.length === 0) return whenEmpty;
  return <div {...props}>{items.map(render)}</div>;
}

function ListSkeleton({
  length: length,
  render,
  ...props
}: Omit<ComponentProps<"div">, "children"> & {
  length: number;
  render: (value: null, index: number, array: number[]) => JSX.Element;
}) {
  const arr = new Array(length).fill(null);
  return <div {...props}>{arr.map(render)}</div>;
}
