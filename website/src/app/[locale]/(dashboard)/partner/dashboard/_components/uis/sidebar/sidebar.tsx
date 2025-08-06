import {
  Sidebar as ShadcnSidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "@/components/shadcn/sidebar";
import { Separator } from "@/components/shadcn/separator";
import SidebarContentMain from "@/app/[locale]/(dashboard)/partner/dashboard/_components/uis/sidebar/sidebar-content-main";
import SidebarHeaderProfile from "@/app/[locale]/(dashboard)/partner/dashboard/_components/uis/sidebar/sidebar-header-profile";
import SidebarFooterApplications from "@/app/[locale]/(dashboard)/partner/dashboard/_components/uis/sidebar/sidebar-footer-applications";

export default function Sidebar() {
  return (
    <ShadcnSidebar>
      <SidebarHeader>
        <SidebarHeaderProfile />
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarContentMain />
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <SidebarFooterApplications />
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
