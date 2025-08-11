import type { TGroup } from "@/app/[locale]/(dashboard)/_types/group";

import { Fragment } from "react";
import { getTranslations } from "next-intl/server";
import SidebarGroup from "@/app/[locale]/(dashboard)/_components/uis/sidebar/sidebar-group";

export default async function SidebarContentMain() {
  const t = await getTranslations("admin.dashboard.page.sidebar.main");
  const groups: Array<TGroup> = t.raw("groups");

  return (
    <Fragment>
      {groups.map((group) => (
        <SidebarGroup key={group.title} {...group} />
      ))}
    </Fragment>
  );
}
