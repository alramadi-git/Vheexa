import { type ReactNode, Fragment } from "react";
import Header from "@/app/[locale]/()/_components/uis/header/header";
import Footer from "@/app/[locale]/()/_components/uis/footer/footer";

interface IProps {
  children: ReactNode;
}

export default function Layout(props: Readonly<IProps>) {
  return (
    <Fragment>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
}
