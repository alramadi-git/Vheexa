import { Fragment } from "react";

import Header from "@/components/templates/user/layout/header/header";
import Footer from "@/components/templates/user/layout/footer/footer";

export const dynamic = "force-static";

export default async function Layout({
  children,
}: LayoutProps<"/[locale]">) {
  return (
    <Fragment>
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
}
