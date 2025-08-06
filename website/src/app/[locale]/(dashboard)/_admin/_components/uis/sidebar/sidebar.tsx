import {
  Sidebar as ShadcnSidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "@/components/shadcn/sidebar";
import SidebarContentMain from "@/app/[locale]/(dashboard)/_admin/_components/uis/sidebar/sidebar-content-main";
import SidebarHeaderProfile from "@/app/[locale]/(dashboard)/_admin/_components/uis/sidebar/sidebar-header-profile";
import SidebarFooterApplications from "@/app/[locale]/(dashboard)/_admin/_components/uis/sidebar/sidebar-footer-applications";
import { Separator } from "@/components/shadcn/separator";

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
