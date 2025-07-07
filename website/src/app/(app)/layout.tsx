import { Fragment, ReactNode } from "react";
import Header from "@/app/(app)/_components/uis/header";
import Footer from "@/app/(app)/_components/uis/footer";

interface IProps {
  children: ReactNode;
}

export const dynamic = "force-static";

function Layout(props: Readonly<IProps>) {
  return (
    <Fragment>
      <Header />
      {props.children}
      <Footer />
    </Fragment>
  );
}

export default Layout;
