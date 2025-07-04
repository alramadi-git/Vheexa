import { Fragment, ReactNode } from "react";

export const dynamic = "force-static";

interface IProps {
  children: ReactNode;
}
function Layout(props: IProps) {
  return <Fragment>{props.children}</Fragment>;
}

export default Layout;
