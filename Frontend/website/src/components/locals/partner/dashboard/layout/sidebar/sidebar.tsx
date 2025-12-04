"use client";

import {
  Sidebar as ShadcnSidebar,
  SidebarSeparator,
} from "@/components/shadcn/sidebar";

import SidebarHeader from "./sidebar-header";
import SidebarContent from "./sidebar-content";
import SidebarFooter from "./sidebar-footer";

export default function Sidebar() {
  return (
    <ShadcnSidebar>
      {/* <SidebarHeader /> */}
      <SidebarContent />
      <SidebarSeparator />
      <SidebarFooter />
    </ShadcnSidebar>
  );
}
