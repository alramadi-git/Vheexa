import { getTranslations } from "next-intl/server";

import { FaHandshakeSimple, FaHouse } from "react-icons/fa6";
import SidebarApplications from "@/app/[locale]/(dashboard)/_components/uis/sidebar/sidebar-applications";

const application_icons = [FaHouse];

export default async function SidebarFooterApplications() {
  const t = await getTranslations(
    "admin.dashboard.page.sidebar.footer",
  );

  const applications = t
    .raw("application.links")
    .map((link: object, index: number) => ({
      ...link,
      icon: application_icons[index],
    }));

  return (
    <SidebarApplications
      icon={FaHandshakeSimple}
      label={t("label")}
      description={t("description")}
      applications={applications}
    />
  );
}
